<template>
    <div class="main-container">
        <button type="submit" class="add_row" title="Добавить оборудование">
            <img src="../assets/add-circle-svgrepo-com.svg" alt="add" >
        </button>
        <VueTableLite
            :is-loading="table.isLoading"
            :columns="table.columns"
            :rows="table.rows"
            :total="table.totalRecordCount"
            :sortable="table.sortable"
            class="table">
        </VueTableLite>
    </div>
</template>

<script>
import VueTableLite from 'vue3-table-lite'
import { onMounted, reactive, ref } from 'vue';
// import EquipmentService from '@/api/EquipmentService'

export default {
    name: 'MainPage',
    components: { 
        VueTableLite 
    },
    setup() {
        const equipmentList = ref([]);
      // Инициализация настроек таблицы
        const table = reactive({
            isLoading: false,
            columns: [
            {
                label: 'ID',
                field: 'equipment_id',
                width: '3%',
                sortable: true,
                isKey: true,
                headerStyles: {background: '#1c274c'}
            },
            {
                label: 'Название',
                field: 'equipment_name',
                width: '10%',
                sortable: true,
                headerStyles: {background: '#1c274c'}
            },
            {
                label: 'Инвентарный номер',
                field: 'inventory_number',
                width: '15%',
                sortable: true,
                headerStyles: {background: '#1c274c'}
            },
            {
                label: 'Мат. ответственный',
                field: 'equipment_responsible_name',
                width: '15%',
                sortable: true,
                headerStyles: {background: '#1c274c'}
            },
            {
                label: 'Структурное подразделение',
                field: 'division_name',
                width: '15%',
                sortable: true,
                headerStyles: {background: '#1c274c'}
            },
            {
                label: 'Тип оборудования',
                field: 'equipment_type_name',
                width: '15%',
                sortable: true,
                headerStyles: {background: '#1c274c'}
            },
            {
                label: 'Статус оборудования',
                field: 'equipment_status_name',
                width: '15%',
                sortable: true,
                headerStyles: {background: '#1c274c'}
            },
            ],
            rows: equipmentList.value,
            totalRecordCount: 0,
            sortable: {
            order: 'id',
            sort: 'asc',
            },
        });
        onMounted(() => {
            table.isLoading = true;
            for (let i = 0; i < 20; i++) {
                equipmentList.value.push({
                    equipment_id: i,
                    equipment_name: 'TEST' + i,
                    inventory_number: i+1000000,
                    equipment_responsible_name: 'TestTest' + i,
                    division_name:'Division' + i,
                    equipment_type_name:'type' + i,
                    equipment_status_name:'status_' + i
            }); 
        }  //EquipmentService.getEquipmentList()
            table.isLoading = false;
        })
        return { table }
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

    .table {
        margin: 20px;
    }

    .add_row {
        width: fit-content;
        height: fit-content;
        border: none;
        background: none;
        margin-left: auto;
        padding: 10px;
    }

    img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
    }

    img:hover {
        cursor: pointer;
    }
    
    .bg_dark-blue {
        background: #1c274c !important;
    }
</style>