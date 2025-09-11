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
            <el-table-column prop="username" label="账号" width="120"></el-table-column>
            <el-table-column prop="role" label="角色" width="120"></el-table-column>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100" />
            <el-table-column prop="sex" label="性别"width="100" />
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="departmentName" label="部门" width="100" />
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
            <el-form-item label="账号" prop="username">
                <el-input v-model="formData.username" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" placeholder="请输入密码" type="password" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-input v-model="formData.role" placeholder="请输入角色" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-input v-model="formData.sex" placeholder="请输入性别" />
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="formData.age" placeholder="请输入年龄" type="number" />
            </el-form-item>
            <el-form-item label="部门" prop="departmentName">
                <el-input v-model="formData.departmentName" placeholder="请输入部门" />
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
    import { reactive, ref, computed, nextTick, onMounted } from 'vue'
    import { Search, Delete, Refresh, Plus } from '@element-plus/icons-vue'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { employeeApi } from '@/api/index'
    import { ElPagination } from 'element-plus'

    const data = reactive({
        name: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        originalData: []
    })

    // 状态变量
    const selectedRows = ref([])
    const loading = ref(false)
    const dialogVisible = ref(false)
    const formRef = ref(null)
    const editingId = ref(null)

    const load = async () => {
        loading.value = true
        try {
            const res = await employeeApi.getEmployeeList({
                pageNum: data.currentPage,
                pageSize: data.pageSize,
                name: data.name
            })
            console.log('员工API响应:', res)
            
            // 处理后端返回的PageInfo格式数据
            if (res.data && res.data.list) {
                data.originalData = res.data.list
                data.total = res.data.total
            } else {
                data.originalData = res.data || []
                data.total = res.data?.length || 0
            }
        } catch (error) {
            console.error('获取员工数据失败:', error)
            ElMessage.error('获取员工数据失败，请稍后重试')
        } finally {
            loading.value = false
        }
    }
    
    // 组件挂载时加载数据
    onMounted(() => {
        load()
    })
    
    // 表单数据和规则
    const formData = reactive({
        name: '',
        age: '',
        sex: '',
        no: '',
        phoneNumber: '',
        departmentName: '',
        username: '',
        password: '',
        role: ''
    })
    
    const formRules = {
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { type: 'number', min: 0, max: 120, message: '年龄应在0-120之间', trigger: 'blur' }
        ],
        sex: [
            { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        no: [
            { required: true, message: '请输入编号', trigger: 'blur' }
        ],
        phoneNumber: [
            { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        departmentName: [
            { required: true, message: '请输入部门', trigger: 'blur' }
        ],
        username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ],
        role: [
            { required: true, message: '请输入角色', trigger: 'blur' }
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
        load() // 重新加载数据，使用当前的name作为查询条件
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
        formData.sex = ''
        formData.no = ''
        formData.phoneNumber = ''
        formData.departmentName = ''
        formData.username = ''
        formData.password = ''
        formData.role = ''
        dialogVisible.value = true
    }
    
    // 处理编辑
    const handleEdit = (row) => {
        editingId.value = row.id
        formData.name = row.name
        formData.age = row.age
        formData.sex = row.sex
        formData.no = row.no
        formData.phoneNumber = row.phoneNumber
        formData.departmentName = row.departmentName
        formData.username = row.username || ''
        formData.password = row.password || ''
        formData.role = row.role || ''
        dialogVisible.value = true
    }
    
    // 处理提交
    const handleSubmit = async () => {
        try {
            await formRef.value.validate()
            
            if (editingId.value) {
                // 编辑 - 调用后端update接口
                const employeeData = {
                    id: editingId.value,
                    ...formData
                }
                
                loading.value = true
                console.log('提交编辑数据:', employeeData)
                
                try {
                    await employeeApi.updateEmployee(editingId.value, formData)
                    
                    // 重新加载数据
                    load()
                    ElMessage.success('编辑成功')
                    dialogVisible.value = false
                } catch (error) {
                    console.error('编辑请求失败:', error)
                    ElMessage.error('编辑失败，请检查数据格式是否正确')
                } finally {
                    loading.value = false
                }
            } else {
                // 新增 - 调用后端add接口
                loading.value = true
                console.log('提交新增数据:', formData)
                
                try {
                    await employeeApi.createEmployee(formData)
                    
                    // 重新加载数据
                    load()
                    ElMessage.success('新增成功')
                    dialogVisible.value = false
                } catch (error) {
                    console.error('新增请求失败:', error)
                    ElMessage.error('新增失败，请检查数据格式是否正确')
                } finally {
                    loading.value = false
                }
            }
            
            dialogVisible.value = false
        } catch (error) {
            console.error('提交失败:', error)
            ElMessage.error('操作失败，请稍后重试')
        } finally {
            loading.value = false
        }
    }
    
    // 处理单个删除
    const handleSingleDelete = (row) => {
        ElMessageBox.confirm(
            `确定要删除员工「${row.name}」吗？`,
            '删除确认',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }
        ).then(async () => {
            try {
                loading.value = true
                await employeeApi.deleteEmployee(row.id)
                
                // 重新加载数据
                load()
                ElMessage.success('删除成功')
            } catch (error) {
                console.error('删除失败:', error)
                ElMessage.error('删除失败，请稍后重试')
            } finally {
                loading.value = false
            }
        }).catch(() => {
            ElMessage.info('已取消删除')
        })
    }
    
    // 处理批量删除
    const handleDelete = () => {
        ElMessageBox.confirm(
            `确定要删除选中的 ${selectedRows.value.length} 个员工吗？`,
            '删除确认',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }
        ).then(async () => {
            try {
                loading.value = true
                
                // 逐个删除（可以优化为批量删除接口）
                for (const row of selectedRows.value) {
                    await employeeApi.deleteEmployee(row.id)
                }
                
                // 重新加载数据
                load()
                selectedRows.value = []
                ElMessage.success('删除成功')
            } catch (error) {
                console.error('批量删除失败:', error)
                ElMessage.error('删除失败，请稍后重试')
            } finally {
                loading.value = false
            }
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