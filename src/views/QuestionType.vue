<template>
    <div>
        <el-button @click="handleEdit()" type="success" icon="el-icon-edit">新增</el-button>
        &nbsp
        <el-button @click="bathDeleteAsset" type="danger"
                   :disabled="this.selectionList.length == 0">删除</el-button>
        <br><br>
        <el-table :data="tableData" border style="width: 100%" @selection-change="selectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column fixed type="index" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="questionTypeOne" label="工单类型一" width="150">
            </el-table-column>
            <el-table-column prop="questionTypeTwo" label="工单类型二" width="180">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index,scope.row)" type="info" size="small" icon="el-icon-edit">编辑</el-button>
                    <el-button @click="deleteAsset(scope.row)" type="danger" size="small"icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size= "pageSize"
                :total="total"
                :current-page="currentPage"
                @current-change="pageChange">
        </el-pagination>
        <!-- ’编辑‘弹框界面-->
        <el-dialog :visible.sync="dialogFormVisible" :close-on-click-modal="false" style="width: 100%" title="编辑资产信息" >
            <el-form :model="editForm" ref="editForm">
                <el-form-item style="width: 80%" label="id" prop="id" >
                    <el-input v-model="editForm.id" readonly ></el-input>
                </el-form-item>
                <el-form-item style="width: 80%" label="工单类型一">
                    <el-input v-model="editForm.questionTypeOne" ></el-input>
                </el-form-item>
                <el-form-item style="width: 80%" label="工单类型二" >
                    <el-input v-model="editForm.questionTypeTwo"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button @click="resetForm('editForm')">重置</el-button>
                <el-button type="primary" @click="updateQT">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        inject: ['reload'], //依赖注入
        methods: {
            pageChange(currentPage){
                const that = this
                that.currentPage = currentPage;
                that.getList(that)
            },
            //批量选择时触发
            selectionChange(val){
                this.selectionList = val
            },
            getList(that){
                axios.get(this.baseUrl+'/listQT1/'+that.currentPage+'/10').then(function (response) {
                    that.tableData = response.data.content
                    that.total = response.data.totalElements
                })
            },
            listByStatus(command){
                const that = this
                axios.request({
                    url: this.baseUrl+'/listByStatus',
                    params:{
                        status:command,
                        page:that.currentPage,
                        size:10
                    }
                }).then((response) =>{
                    that.tableData = response.data.content
                    that.total = response.data.totalElements
                })
            },
            findByJobNumber(){
                let i = parseInt(this.jobNumber)
                const that = this
                axios.get(this.baseUrl+'/findByJobNumber?jobNumber='+i).then((response)=>{
                    that.tableData = response.data
                    that.total = response.data.totalElements
                })
            },
            handleEdit(index,row){
                this.dialogFormVisible = true;
                this.editForm = Object.assign({},row);
            },
            updateQT(){
                let param = Object.assign({},this.editForm);
                axios.post(this.baseUrl+'/updateQT',param).then((response)=>{
                    if(response.data.success == true){
                        this.$alert('修改成功!','提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.reload();
                            }
                        });
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            deleteAsset(row){
                this.$confirm('此操作将永久删除所选中信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        axios.delete(this.baseUrl+'/deleteQT/?id='+row.id)
                    this.$alert('删除成功!','提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.reload();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            bathDeleteAsset() {
                let assetIds = this.selectionList.map(item => item.id).join()
                this.$confirm('此操作将永久删除所选中信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post(this.baseUrl+'/bathDeleteAsset/?assetIds=' + assetIds)
                    this.$alert('删除成功!','提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.reload(); //调用注入的方法达到刷新router-view的目的
                            // window.location.reload()
                        }
                    });
                    this.listByStatus("否");
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        },
        created() {
            const this1 = this
            this1.getList(this1)
        },
        data() {
            return {
                baseUrl: 'http://103.228.163.54:9001/',
                input:'',
                questionTypeOne:'',
                questionTypeTwo:'',
                selectionList:'',
                pageSize: 10,
                total: 0,
                tableData: [],
                currentPage: 1,
                checked: true,
                dialogFormVisible: false,
                editForm: {
                    id:'',
                    questionTypeOne:'',
                    questionTypeTwo: ''
                },
            }
        }
    }
</script>
