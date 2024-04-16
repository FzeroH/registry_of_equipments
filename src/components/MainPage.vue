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
    </div>
    <DialogPage :showModal="isVisible" @closeModal="closeModal" />
</template>

<script>
import VueTableLite from 'vue3-table-lite';
import { ref, reactive } from 'vue';
import EquipmentService from '@/api/EquipmentService';
import DialogPage from './DialogPage.vue';

export default {
    name: 'MainPage',
    components: { 
        VueTableLite,
        DialogPage,
    },
    setup() {
        const isVisible = ref(false)
        const equipmentList = ref([]);
      // Инициализация настроек таблицы
        const table = reactive({
            isLoading: false,
            rowClasses: (row) => {
                if (row.id == 1) {
                return ["aaa", "is-id-one"];
                }
                return ["bbb", "other"];
            },
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
        // Функция сортировки данных в таблице. Для сортировки используются переменные order и sort.
        // limit и offset были добавлены, так как этого требует функция.
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

        const rowClicked = (row) => {
            console.log(row);
        };

        const showModal = () => {
            isVisible.value = true;
        };

        const closeModal = () => {
            isVisible.value = false;
        };

        return { table, doSearch, rowClicked, isVisible, showModal, closeModal }
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
        margin: auto;
    }

    .add_row {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        border: none;
        background: none;
        background-image: url('../assets/add-circle-svgrepo-com.svg');
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