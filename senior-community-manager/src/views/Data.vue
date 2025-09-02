<template>
  <div>
    <el-card>
        <el-input class="search-input" v-model="data.name" placeholder="请输入名称查询" prefix-icon="Search"></el-input>
        <el-button class="search-btn" type="warning">
            <el-icon style="margin-right: 5px;"><Search /></el-icon>
            查询</el-button>
        <el-button class="reset-btn" type="warning">
            <el-icon style="margin-right: 5px;"><Refresh /></el-icon>
            重置</el-button>
    </el-card>
    <el-card style="margin-top: 20px">
        <el-button type="warning">
            <el-icon style="margin-right: 5px;"><Plus /></el-icon>
            新增</el-button>
        <el-button type="danger" >
            <el-icon style="margin-right: 5px;"><Delete /></el-icon>
            批量删除</el-button>
            <el-table :data="data.tableData" style="width: 100%;margin-top: 20px;">
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="age" label="年龄" width="180" />
        <el-table-column prop="address" label="地址" />
        </el-table>
        <el-pagination
        v-model:current-page="data.currentPage"
        v-model:page-size="data.pageSize"
        style="margin-top: 20px"
            layout="prev, pager, next"
            :page-size="[5, 10, 15, 20]"
            :total="data.total"
            hide-on-single-page="true"
        />
    </el-card>
  </div>
</template>

<script lang="js" name="Data" setup>
    import { reactive } from 'vue'
    import { Search,Delete } from '@element-plus/icons-vue'

    const data = reactive({
        name: null,
        tableData: [
            {
                id: 1,
                name: '张三',
                age: 18,
                address: '北京'
            },
            {
                id: 2,
                name: '张三',
                age: 18,
                address: '北京'
            },
            {
                id: 3,
                name: '张三',
                age: 18,
                address: '北京'
            },
            {
                id: 4,
                name: '张三',
                age: 18,
                address: '北京'
            },
            {
                id: 5,
                name: '张三',
                age: 18,
                address: '北京'
            },
            {
                id: 6,
                name: '张三',
                age: 18,
                address: '北京'
            },
            {
                id: 7,
                name: '张三',
                age: 18,
                address: '北京'
            },
            {
                id: 8,
                name: '张三',
                age: 18,
                address: '北京'
            },
            {
                id: 9,
                name: '张三',
                age: 18,
                address: '北京'
            },
            {
                id: 10,
                name: '张三',
                age: 18,
                address: '北京'
            },
            {
                id: 11,
                name: '张三',
                age: 18,
                address: '北京'
            },

        ],
        // currentPage: 1,
        pageSize: 10,
        total: 50,
    })

</script>

<style scoped>
    .search-input {
        width: 240px;
    }
    .search-btn {
        margin-left: 10px;
    }
    .reset-btn {
        margin-left: 10px;
    }
</style>