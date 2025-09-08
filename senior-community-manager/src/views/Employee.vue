<template>
  <div class="data-container">
    <h2>员工数据管理</h2>
    
    <el-card>
        <el-input class="search-input" v-model="data.name" placeholder="请输入名称查询" prefix-icon="Search"></el-input>
        <el-button class="search-btn" type="warning" @click="searchData">
            <el-icon style="margin-right: 5px;"><Search /></el-icon>
            查询</el-button>
        <el-button class="reset-btn" type="warning" @click="resetSearch">
            <el-icon style="margin-right: 5px;"><Refresh /></el-icon>
            重置</el-button>
    </el-card>
    
    <el-card style="margin-top: 20px">
        <div class="card-header">
            <el-button type="warning" @click="handleAdd">
                <el-icon style="margin-right: 5px;"><Plus /></el-icon>
                新增</el-button>
            <el-button type="danger" @click="handleDelete" :disabled="selectedRows.length === 0">
                <el-icon style="margin-right: 5px;"><Delete /></el-icon>
                批量删除</el-button>
        </div>
        
        <el-table 
            :data="paginatedData" 
            style="width: 100%;margin-top: 20px;"
            @selection-change="handleSelectionChange"
            v-loading="loading"
            element-loading-text="加载中..."
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100" />
            <el-table-column prop="sex" label="性别"width="100" />
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="no" label="编号"/>
            <el-table-column prop="phoneNumber" label="电话号码" width="180"></el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-button type="danger" size="small" @click="handleSingleDelete(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-pagination
            v-model:current-page="data.currentPage"
            v-model:page-size="data.pageSize"
            style="margin-top: 20px"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[5, 10, 15, 20]"
            :total="filteredData.length"
            hide-on-single-page="true"
        />
    </el-card>
    
    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" title="用户信息" width="500px">
        <el-form :model="formData" :rules="formRules" ref="formRef">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-input v-model="formData.sex" placeholder="请输入性别" />
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="formData.age" placeholder="请输入年龄" type="number" />
            </el-form-item>
            <el-form-item label="编号" prop="no">
                <el-input v-model="formData.no" placeholder="请输入编号" />
            </el-form-item>
            <el-form-item label="电话号码" prop="phoneNumber">
                <el-input v-model="formData.phoneNumber" placeholder="请输入电话号码" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">确定</el-button>
            </span>
        </template>
    </el-dialog>
  </div>
</template>

<script lang="js" name="Data" setup>
    import { reactive, ref, computed, nextTick } from 'vue'
    import { Search, Delete, Refresh, Plus } from '@element-plus/icons-vue'
    import { ElMessage, ElMessageBox } from 'element-plus'

    const data = reactive({
        name: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        originalData: [
            {
                id: 1,
                name: '张三',
                age: 65,
                address: '北京市朝阳区'
            },
            {
                id: 2,
                name: '李四',
                age: 72,
                address: '北京市海淀区'
            },
            {
                id: 3,
                name: '王五',
                age: 68,
                address: '北京市西城区'
            },
            {
                id: 4,
                name: '赵六',
                age: 75,
                address: '北京市东城区'
            },
            {
                id: 5,
                name: '钱七',
                age: 62,
                address: '北京市丰台区'
            },
            {
                id: 6,
                name: '孙八',
                age: 70,
                address: '北京市石景山区'
            },
            {
                id: 7,
                name: '周九',
                age: 66,
                address: '北京市通州区'
            },
            {
                id: 8,
                name: '吴十',
                age: 69,
                address: '北京市昌平区'
            },
            {
                id: 9,
                name: '郑十一',
                age: 73,
                address: '北京市大兴区'
            },
            {
                id: 10,
                name: '王十二',
                age: 64,
                address: '北京市顺义区'
            },
            {
                id: 11,
                name: '李十三',
                age: 71,
                address: '北京市房山区'
            },
            {
                id: 12,
                name: '张十四',
                age: 67,
                address: '北京市门头沟区'
            },
            {
                id: 13,
                name: '刘十五',
                age: 74,
                address: '北京市平谷区'
            },
            {
                id: 14,
                name: '陈十六',
                age: 63,
                address: '北京市怀柔区'
            },
            {
                id: 15,
                name: '杨十七',
                age: 68,
                address: '北京市密云区'
            }
        ]
    })

    // 状态变量
    const selectedRows = ref([])
    const loading = ref(false)
    const dialogVisible = ref(false)
    const formRef = ref(null)
    const editingId = ref(null)
    
    // 表单数据和规则
    const formData = reactive({
        name: '',
        age: '',
        address: ''
    })
    
    const formRules = {
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { type: 'number', min: 0, max: 120, message: '年龄应在0-120之间', trigger: 'blur' }
        ],
        address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
        ]
    }
    
    // 计算筛选后的数据
    const filteredData = computed(() => {
        if (!data.name) {
            return data.originalData
        }
        return data.originalData.filter(item => 
            item.name.toLowerCase().includes(data.name.toLowerCase())
        )
    })
    
    // 计算分页后的数据
    const paginatedData = computed(() => {
        const start = (data.currentPage - 1) * data.pageSize
        const end = start + data.pageSize
        return filteredData.value.slice(start, end)
    })
    
    // 处理搜索
    const searchData = () => {
        loading.value = true
        // 模拟异步搜索
        setTimeout(() => {
            data.currentPage = 1
            loading.value = false
        }, 300)
    }
    
    // 重置搜索
    const resetSearch = () => {
        data.name = ''
        data.currentPage = 1
    }
    
    // 处理选择变化
    const handleSelectionChange = (selection) => {
        selectedRows.value = selection
    }
    
    // 处理新增
    const handleAdd = () => {
        editingId.value = null
        formData.name = ''
        formData.age = ''
        formData.address = ''
        dialogVisible.value = true
    }
    
    // 处理编辑
    const handleEdit = (row) => {
        editingId.value = row.id
        formData.name = row.name
        formData.age = row.age
        formData.address = row.address
        dialogVisible.value = true
    }
    
    // 处理提交
    const handleSubmit = async () => {
        try {
            await formRef.value.validate()
            
            if (editingId.value) {
                // 编辑
                const index = data.originalData.findIndex(item => item.id === editingId.value)
                if (index !== -1) {
                    data.originalData[index] = {
                        ...data.originalData[index],
                        ...formData
                    }
                }
                ElMessage.success('编辑成功')
            } else {
                // 新增
                const maxId = Math.max(...data.originalData.map(item => item.id))
                data.originalData.unshift({
                    id: maxId + 1,
                    ...formData
                })
                ElMessage.success('新增成功')
            }
            
            dialogVisible.value = false
        } catch (error) {
            console.log('表单验证失败', error)
        }
    }
    
    // 处理单个删除
    const handleSingleDelete = (row) => {
        ElMessageBox.confirm(
            `确定要删除用户「${row.name}」吗？`,
            '删除确认',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }
        ).then(() => {
            const index = data.originalData.findIndex(item => item.id === row.id)
            if (index !== -1) {
                data.originalData.splice(index, 1)
            }
            ElMessage.success('删除成功')
        }).catch(() => {
            ElMessage.info('已取消删除')
        })
    }
    
    // 处理批量删除
    const handleDelete = () => {
        ElMessageBox.confirm(
            `确定要删除选中的 ${selectedRows.value.length} 个用户吗？`,
            '删除确认',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }
        ).then(() => {
            const ids = selectedRows.value.map(item => item.id)
            data.originalData = data.originalData.filter(item => !ids.includes(item.id))
            selectedRows.value = []
            ElMessage.success('删除成功')
        }).catch(() => {
            ElMessage.info('已取消删除')
        })
    }
</script>

<style scoped>
    .data-container {
        padding: 20px;
    }
    
    .data-container h2 {
        margin-bottom: 20px;
        color: #333;
    }
    
    .search-input {
        width: 240px;
    }
    
    .search-btn {
        margin-left: 10px;
    }
    
    .reset-btn {
        margin-left: 10px;
    }
    
    .card-header {
        margin-bottom: 20px;
    }
    
    .dialog-footer {
        display: flex;
        justify-content: flex-end;
    }
</style>