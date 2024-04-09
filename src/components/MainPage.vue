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
            :is-hide-paging="false"
            :hide-default-footer="true"
            :sortable="table.sortable"
            @do-search="doSearch"
            class="table">
        </VueTableLite>
    </div>
</template>

<script>
import VueTableLite from 'vue3-table-lite'
import { ref, reactive } from 'vue';
import EquipmentService from '@/api/EquipmentService'

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
                field: 'equipment_responsible_full_name',
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
                label: 'Номер аудитории',
                field: 'equipment_responsible_position',
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
            rows: [],
            totalRecordCount: 0,
            sortable: {
            order: 'id',
            sort: 'asc',
            },
        });

        const doSearch = (limit, offset, order, sort) => {
            table.isLoading = true;
            EquipmentService.getEquipmentList(order, sort)
            .then(res => { 
                res.forEach(elem => {
                    equipmentList.value.push(elem)
                });
                table.rows = res;
                table.sortable.order = order;
                table.sortable.sort = sort;
                table.isLoading = false;
             })
        }
        doSearch(0,10,'equipment_id', 'asc');
        return { table, doSearch }
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
        padding: 0;
    }

    img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        padding: 0;
        margin: 0;
    }

    img:hover {
        cursor: pointer;
    }
    
    .bg_dark-blue {
        background: #1c274c !important;
    }
</style>