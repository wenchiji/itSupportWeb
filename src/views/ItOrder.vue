<template>
  <div>
    根据楼层查询：
    <el-select v-model="areaList" placeholder="请选择" @change="findByArea">
      <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.area"
              :value="item.value">
      </el-option>
    </el-select>
    根据工单类型查询：
    <el-select v-model="typeList" placeholder="请选择" @change="findByQT1" >
      <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.type"
              :value="item.value">
      </el-option>
    </el-select>
    根据用户姓名查询：
    <el-input @keyup.enter.native="findByName" v-model="username" style="width: 20%" placeholder="请输入姓名"></el-input>
    <br><br>
    <el-table :data="tableData" border style="width: 100%" @selection-change="selectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column fixed type="index" label="序号" width="100">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="150">
      </el-table-column>
      <el-table-column prop="department" label="部门" width="180">
      </el-table-column>
      <el-table-column prop="area" label="楼层" width="120">
      </el-table-column>
      <el-table-column prop="seat" label="座位号" width="120">
      </el-table-column>
      <el-table-column prop="applicationTime" label="提交时间" width="180">
        <template slot-scope="scope">{{scope.row.applicationTime| dateFormat}}</template>
      </el-table-column>
      <el-table-column prop="questionTypeOne" label="工单类型" width="180">
      </el-table-column>
      <el-table-column prop="questionTypeTwo" label="工单类型2" width="180">
      </el-table-column>
      <el-table-column prop="orderDescription" label="工单详情描述" width="180">
      </el-table-column>
      <el-table-column prop="images" label="图片" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index,scope.row)" type="info" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button @click="deleteItOrder(scope.row)" type="danger" size="small"icon="el-icon-delete">删除</el-button>
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
    <el-dialog :visible.sync="dialogFormVisible" :close-on-click-modal="false" style="width: 100%" title="新增/编辑信息" >
      <el-form :model="editForm" ref="editForm">
        <el-form-item style="width: 80%" label="编号" prop="id" >
          <el-input v-model="editForm.id" ></el-input>
        </el-form-item>
        <el-form-item style="width: 80%" label="姓名">
          <el-input v-model="editForm.username" ></el-input>
        </el-form-item>
        <el-form-item style="width: 80%" label="部门" prop="phone" >
          <el-input v-model="editForm.department"></el-input>
        </el-form-item>
        <el-form-item style="width: 80%" label="楼层" prop="password" >
          <el-input v-model="editForm.area"></el-input>
        </el-form-item>
        <el-form-item style="width: 80%" label="提交时间" prop="password" >
          <el-input v-model="editForm.applicationTime"></el-input>
        </el-form-item>
        <el-form-item style="width: 80%" label="工单类型" prop="password" >
          <el-input v-model="editForm.questionTypeOne"></el-input>
        </el-form-item>
        <el-form-item style="width: 80%" label="工单类型2" prop="password" >
          <el-input v-model="editForm.questionTypeTwo"></el-input>
        </el-form-item>
        <el-form-item style="width: 80%" label="工单详情描述" prop="password" >
          <el-input v-model="editForm.orderDescription"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="resetForm('editForm')">重置</el-button>
        <el-button type="primary" @click="addItOrder">新 增</el-button>
        <el-button type="primary" @click="updateItOrder">确 定</el-button>
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
        axios.get(this.baseUrl+'/listTodayOrder/'+that.currentPage+'/10').then(function (response) {
          that.tableData = response.data.content
          that.total = response.data.totalElements
        })
      },
      findByArea(areaList){
        let area = this.areaList
        const that = this
        axios.get(this.baseUrl+'/findByAreaToday',{
          params:{
            area: area,
            page: this.currentPage,
            size: 10
          }
        }).then((response)=>{
          that.tableData = response.data.content
          that.total = response.data.totalElements
        })
      },
      findByQT1(typeList){
        let str = this.typeList
        const that = this
        axios.get(this.baseUrl+'/findByQT1Today',{
          params:{
            qt1: str,
            page: this.currentPage,
            size: 10
          }
        }).then((response)=>{
          that.tableData = response.data.content
          that.total = response.data.totalElements
        })
      },
      findByName(){
        let i = this.username
        const that = this
        axios.get(this.baseUrl+'/findByUserToday',{
          params:{
            username: i,
            page: this.currentPage,
            size: 10
          }
        }).then((response)=>{
          that.tableData = response.data.content
          that.total = response.data.totalElements
        })
      },
      handleEdit(index,row){
        this.dialogFormVisible = true;
        this.editForm = Object.assign({},row);
      },
      updateItOrder(){
        let para = Object.assign({},this.editForm);
        axios.post(this.baseUrl+'/updateItOrder',para).then((response)=>{
          if(response.data.success == true){
            this.$alert('资产信息修改成功!','提示', {
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
      addItOrder(){
        let param = new URLSearchParams()
        param.append('username', this.editForm.username)
        param.append('department', this.editForm.department)
        param.append('area', this.editForm.area)
        param.append('applicationTime', this.editForm.applicationTime)
        param.append('questionTypeOne', this.editForm.questionTypeOne)
        param.append('questionTypeTwo', this.editForm.questionTypeTwo)
        param.append('orderDescription', this.editForm.orderDescription)
        axios.post(this.baseUrl+'/addItOrder/',param).then((response)=>{
          if(response.data.success == 'true'){
            this.$alert('工单信息提交成功!','提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.reload();
              }
            });
          }else {
            this.$alert('工单信息提交失败!','提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.reload();
              }
            });
          }
        })
      },
      deleteItOrder(row){
        this.$confirm('此操作将永久删除所选中信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(this.baseUrl+'/deleteItOrder/?id='+row.id).then(response =>{
            if(response.data.success == true){
              this.$alert('删除成功!','提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.reload();
                }
              });
            }else {
              this.$alert('删除失败!','提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.reload();
                }
              });
            }
          })
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
        // baseUrl: 'http://103.228.163.54:9001',
        baseUrl: 'http://127.0.0.1:9001',
        areaOptions: [
                {
          value: '12',
          area: '12'
        },{
          value: '13',
          area: '13'
        },{
          value: '14',
          area: '14'
        },{
          value: '17',
          area: '17'
        },{
          value: '18',
          area: '18'
        },{
          value: '19',
          area: '19'
        },{
          value: '20',
          area: '20'
        },{
          value: '21',
          area: '21'
        },{
          value: '22',
          area: '22'
        },{
          value: '23',
          area: '23'
        }],
        typeOptions:[
                {
          value: '网络',
          type: '网络'
        },{
          value: '邮箱',
            type: '邮箱'
        },{
          value: '电脑',
            type: '电脑'
        },{
          value: '配件申请/领取',
            type: '配件申请/领取'
        },{
          value: '笔记本报销',
            type: '笔记本报销'
        },{
          value: '资源管理',
            type: '资源管理'
        }],
        input:'',
        username:'',
        areaList:'',
        typeList:'',
        selectionList:'',
        pageSize: 10,
        total: 0,
        tableData: [],
        currentPage: 1,
        checked: true,
        dialogFormVisible: false,
        editForm: {
          id:'',
          username:'',
          department: '',
          area:'',
          seat:'',
          applicationTime: '',
          questionTypeOne:'',
          questionTypeTwo: '',
          orderDescription:'',
        },
      }
    }
  }
</script>
