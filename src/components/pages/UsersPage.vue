<template>
    <div class="main-container">
        <button type="submit" class="add_row" title="Добавить оборудование" @click="showModal">
        </button>
        <VueTableLite
            :is-loading="table.isLoading"
            :columns="table.columns"
            :rows="table.rows"
            :rowClasses="table.rowClasses"
            :total="table.totalRecordCount"
            :is-hide-paging="true"
            :hide-default-footer="true"
            :sortable="table.sortable"
            @do-search="doSearch"
            @row-clicked="rowClicked"
            class="table">
        </VueTableLite>
        <UserModalPage v-if="isVisible" :showModal="isVisible" @closeModal="closeModal" :isNewName="isNewName" :oldData="oldData" />
    </div>
</template>

<script>
import VueTableLite from 'vue3-table-lite';
import { ref, reactive, onMounted } from 'vue';
import EquipmentService from '@/api/EquipmentService';
import UserModalPage from '../modal_pages/UserModalPage.vue';

export default {
    name: 'UsersPage',
    components: { 
        VueTableLite,
        UserModalPage,
    },
    setup() {
        const isVisible = ref(false);
        const isNewName = ref(true);
        const oldData = ref('');

        const typeList = ref([]);
      // Инициализация настроек таблицы
        const table = reactive({
            isLoading: false,
            columns: [
            {
                label: 'ID',
                field: 'user_id',
                width: '3%',
                sortable: false,
                isKey: true,
                headerStyles: {background: '#1c274c'}
            },
            {
                label: 'Роль пользователя',
                field: 'role_name',
                width: '90%',
                sortable: false,
                headerStyles: {background: '#1c274c'}
            },
            {
                label: 'Логин пользователя',
                field: 'login',
                width: '90%',
                sortable: false,
                headerStyles: {background: '#1c274c'}
            },
            {
                label: 'Фамилия',
                field: 'last_name',
                width: '90%',
                sortable: false,
                headerStyles: {background: '#1c274c'}
            },
            {
                label: 'Имя',
                field: 'first_name',
                width: '90%',
                sortable: false,
                headerStyles: {background: '#1c274c'}
            },
            {
                label: 'Отчество',
                field: 'middle_name',
                width: '90%',
                sortable: false,
                headerStyles: {background: '#1c274c'}
            },
            {
                label: 'Подразделение',
                field: 'division_name',
                width: '90%',
                sortable: false,
                headerStyles: {background: '#1c274c'}
            },
            ],
            rows: [],
            totalRecordCount: 0,
            sortable: {
            order: 'id',
            sort: 'asc',
            },
        });
    

        onMounted(() => {
            EquipmentService.getUserList()
            .then(res => { 
                res.forEach(elem => {
                    typeList.value.push(elem)
                });
                table.rows = res;
                table.isLoading = false;
             })
        })

        const rowClicked = (row) => {
            oldData.value = row;
            isNewName.value = false;
            isVisible.value = true;
            console.log(row);
        };

        const showModal = () => {
            isNewName.value = true;
            isVisible.value = true;
        };


        const closeModal = () => {
            isVisible.value = false;
            oldData.value = '';
        };

        return { table, rowClicked, isVisible, showModal, closeModal, isNewName, oldData }
    },
}
</script>

<style scoped>
    .main-container {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .tables-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 20px;
    }

    .table {
        margin: auto;
    }

    .add_row {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        border: none;
        background: none;
        background-image: url('../../assets/add-circle-svgrepo-com.svg');
        background-size: cover;
        margin-left: auto;
        margin-top: 10px;
        margin-right: 10px;
    }

    .add_row:hover {
        cursor: pointer;
    }


    
    .bg_dark-blue {
        background: #1c274c !important;
    }
</style>