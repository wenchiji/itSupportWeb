<!--<template>-->
<!--    //折线图的视图展示层，双向绑定chartData进行数据填充-->
<!--    //双向绑定settings，进行一些设置-->
<!--    <ve-line :data="chartData" ：settings="chartSettings"></ve-line>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "Show",-->
<!--        methods:{-->
<!--            sevenTurnover(){-->
<!--                this.$http({-->
<!--                    url:"merchantMain/sevenTurnover",-->
<!--                    method:"get",-->
<!--                    params:{-->
<!--                        machineCode:this.$route.query.machineCode-->
<!--                    }-->
<!--                }).then((res)=>{-->
<!--                    console.log(res.data.data);-->
<!--                    this.chartData.rows=res.data.data;-->
<!--                    console.log(this.chartData.rows);-->
<!--                    this.turnoverNumber();-->
<!--                })-->
<!--            },-->
<!--        },-->
<!--        data: function () {-->
<!--            return {-->
<!--                chartData: {-->
<!--                    chartSettings:{-->
<!--                        //设置中文图例-->
<!--                        labelMap:{-->
<!--                            //date对应后台返回json数据的key，具体值根据接口字段来修改-->
<!--                            date:"日期",-->
<!--                            //total对应后台返回son数据的value，具体值根据接口字段来修改-->
<!--                            total:"商户数量"-->
<!--                        }-->
<!--                    },-->
<!--                    chartData: {-->
<!--                        //这里的格式必须是对应上面后台接口的字段才能显示图例-->
<!--                        columns: ['date', 'total'],-->
<!--                        rows: []-->
<!--                    },-->
<!--                }-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->