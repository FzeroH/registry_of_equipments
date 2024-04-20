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
    <DialogPage :showModal="isVisible" @closeModal="closeModal" :isNewEquipment="isNewEquipment" :oldData="oldData" />
</template>

<script>
import VueTableLite from 'vue3-table-lite';
import { ref, reactive, onMounted } from 'vue';
import EquipmentService from '@/api/EquipmentService';
import DialogPage from './DialogPage.vue';

export default {
    name: 'DivisionPage',
    components: { 
        VueTableLite,
        DialogPage,
    },
    setup() {
        const isVisible = ref(false);
        // const isNewEquipment = ref(true);
        // const oldData = ref({});

        const divisionList = ref([]);
      // Инициализация настроек таблицы
        const table = reactive({
            isLoading: false,
            columns: [
            {
                label: 'ID',
                field: 'division_id',
                width: '3%',
                sortable: false,
                isKey: true,
                headerStyles: {background: '#1c274c'}
            },
            {
                label: 'Название',
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
        // Функция сортировки данных в таблице. Для сортировки используются переменные order и sort.
        // limit и offset были добавлены, так как этого требует функция.
        // const doSearch = (limit, offset, order, sort) => {
        //     table.isLoading = true;
        //     EquipmentService.getDivisionListList()
        //     .then(res => { 
        //         res.forEach(elem => {
        //             divisionList.value.push(elem)
        //         });
        //         table.rows = res;
        //         table.sortable.order = order;
        //         table.sortable.sort = sort;
        //         table.isLoading = false;
        //      })
        // }
        // doSearch(0,10,'equipment_id', 'asc');

        onMounted(() => {
            EquipmentService.getDivisionList()
            .then(res => { 
                res.forEach(elem => {
                    divisionList.value.push(elem)
                });
                table.rows = res;
                // table.sortable.order = order;
                // table.sortable.sort = sort;
                table.isLoading = false;
             })
        })

        const rowClicked = (row) => {
            // oldData.value = row;
            // isNewEquipment.value = false;
            // isVisible.value = true;
            console.log(row);
        };

        const showModal = () => {
            // isNewEquipment.value = true;
            isVisible.value = true;
        };


        const closeModal = () => {
            isVisible.value = false;
            // oldData.value = {};
        };

        return { table, rowClicked, isVisible, showModal, closeModal, }
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