<template>
  <PageWrapper
    title="分步表单"
    content=" 高级表单常见于一次性输入和提交大批量数据的场景。"
  >
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>仓库管理</span>
        </div>
      </template>
      <el-form
        ref="formRef"
        :model="formData"
        label-width="120px"
        :size="formSize"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓库名" prop="reposName" required>
              <el-input v-model="formData.reposName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库域名" prop="reposAddress" required>
              <el-input v-model="formData.reposAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库管理员" prop="reposAdminstor" required>
              <el-input v-model="formData.reposAdminstor"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>任务管理 </span>
        </div>
      </template>
      <el-form
        ref="formRef2"
        :model="formData"
        label-width="120px"
        :size="formSize"
      >
        <el-form
          ref="formRef"
          :model="formData"
          label-width="120px"
          :size="formSize"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="任务名" prop="taskName" required>
                <el-input v-model="formData.reposName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任务描述" prop="taskDes" required>
                <el-input v-model="formData.reposAddress"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="执行人" prop="excutor" required>
                <el-input v-model="formData.reposAdminstor"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>成员管理 </span>
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="成员姓名" prop="name" />
        <el-table-column label="工号" prop="no" />
        <el-table-column label="所属部门" prop="depart" />
        <el-table-column align="right">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </PageWrapper>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
type ComponentSize = 'large' | 'medium' | 'small' | 'mini'
const formSize: ComponentSize = 'mini'
const tableData = ref([
  {
    name: 'Tom',
    no: '00001',
    depart: 'IT',
    editable: false
  },
  {
    name: 'Tim',
    no: '00002',
    editable: false,
    depart: '宣传'
  },
  {
    name: 'Alex',
    no: '00003',
    editable: false,
    depart: '人事'
  }
])
const formData = reactive({
  reposName: '',
  reposAddress: '',
  reposAdminstor: ''
})

function handleEdit(record) {
  record.onEdit?.(true)
}
function handleDelete(record) {
  record.onDelete?.()
}

// function handleCancel(record: EditRecordRow) {
//   record.onEdit?.(false)
//   if (record.isNew) {
//     const data = getDataSource()
//     const index = data.findIndex((item) => item.key === record.key)
//     data.splice(index, 1)
//   }
// }

// function handleSave(record: EditRecordRow) {
//   record.onEdit?.(false, true)
// }

// function handleEditChange(data: Recordable) {
//   console.log(data)
// }

// function handleAdd() {
//   const data = getDataSource()
//   const addRow: EditRecordRow = {
//     name: '',
//     no: '',
//     dept: '',
//     editable: true,
//     isNew: true,
//     key: `${Date.now()}`
//   }
//   data.push(addRow)
// }

// function createActions(
//   record: EditRecordRow,
//   column: BasicColumn
// ): ActionItem[] {
//   if (!record.editable) {
//     return [
//       {
//         label: '编辑',
//         onClick: handleEdit.bind(null, record)
//       },
//       {
//         label: '删除'
//       }
//     ]
//   }
//   return [
//     {
//       label: '保存',
//       onClick: handleSave.bind(null, record, column)
//     },
//     {
//       label: '取消',
//       popConfirm: {
//         title: '是否取消编辑',
//         confirm: handleCancel.bind(null, record, column)
//       }
//     }
//   ]
// }
</script>
<style lang="scss"></style>
'
