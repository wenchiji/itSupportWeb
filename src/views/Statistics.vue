<template>
    <div id="myChart" :style="{width: '500px', height: '500px'}"></div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        mounted(){
            this.drawLine();
        },
        methods: {
            getTotal(that){
                axios.get(this.baseUrl+'/findTotalNumber/').then(function (response) {
                    that.tableData = response.data.content
                })
            },
            drawLine(){
                // 初始化Echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '在Vue中简单使用Echarts' },
                    tooltip: {},
                    xAxis: {
                        data: ["测试a","测试b","测试c","测试d","测试e","测试f"]
                    },
                    yAxis: {},
                    series: [{
                        name: '数量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            }
        }
    }
</script>