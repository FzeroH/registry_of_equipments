<template>
  <div class="main-container">

    <div class="search">
      <input v-model="search" type="text" class="search__input" placeholder="Поиск" @keydown.enter="() => doSearch(0, 10, table.sortable.order, table.sortable.sort)" />
      <input type="button" value="Поиск" class="search__btn" @click="() => doSearch(0, 10, table.sortable.order, table.sortable.sort)" />
    </div>
    <div class="button-container">
        <button
        v-if="isAdmin || isEmployee"
        type="submit"
        class="add_row"
        title="Добавить оборудование"
        @click="showModal"
      ></button>

      <button
        v-if="isAdmin || isEmployee"
        type="submit"
        class="btn_download"
        title="Сформировать ведомость"
        @click="downloadDocument"
      ></button>
    </div>

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
      class="table"
    >
    </VueTableLite>
  </div>
  <MainModalPage
    v-if="isVisible"
    :showModal="isVisible"
    @closeModal="closeModal"
    :isNewEquipment="isNewEquipment"
    :oldData="oldData"
  />
</template>

<script>
import VueTableLite from "vue3-table-lite";
import { ref, reactive } from "vue";
import EquipmentService from "@/api/EquipmentService";
import MainModalPage from "../modal_pages/MainModalPage.vue";
import { checkIsAdmin, checkIsEmployee } from "@/utils";

export default {
  name: "MainPage",
  props: {
    search: {
      type: String,
      default: "",
    },
  },
  components: {
    VueTableLite,
    MainModalPage,
  },
  setup(props) {
    const isAdmin = checkIsAdmin();
    const isEmployee = checkIsEmployee();
    const isVisible = ref(false);
    const isNewEquipment = ref(true);
    const oldData = ref(null);
    const search = ref(props.search);

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
          label: "Название",
          field: "equipment_name",
          width: "10%",
          sortable: true,
          headerStyles: { background: "#1c274c" },
        },
        {
          label: "Инвентарный номер",
          field: "inventory_number",
          width: "15%",
          sortable: true,
          headerStyles: { background: "#1c274c" },
        },
        {
          label: "Мат. ответственный",
          field: "responsible_full_name",
          width: "15%",
          sortable: true,
          headerStyles: { background: "#1c274c" },
        },
        {
          label: "Структурное подразделение",
          field: "division_name",
          width: "15%",
          sortable: true,
          headerStyles: { background: "#1c274c" },
        },
        {
          label: "Балансовая стоимость, руб.",
          field: "balance_cost",
          width: "15%",
          sortable: true,
          headerStyles: { background: "#1c274c" },
        },
        {
          label: "Количество",
          field: "quantity",
          width: "15%",
          sortable: true,
          headerStyles: { background: "#1c274c" },
        },
        {
          label: "Статус оборудования",
          field: "equipment_status_name",
          width: "15%",
          sortable: true,
          headerStyles: { background: "#1c274c" },
        },
        {
          label: "Добавил",
          field: "login",
          width: "15%",
          sortable: true,
          headerStyles: { background: "#1c274c" },
        },
        {
          label: "Дата постановки на учет",
          field: "date_registration",
          width: "15%",
          sortable: true,
          headerStyles: { background: "#1c274c" },
        },
        {
          label: "Дата снятия с учета",
          field: "date_de_registration",
          width: "15%",
          sortable: true,
          headerStyles: { background: "#1c274c" },
        },
        {
          label: "Дата добавления",
          field: "date_start",
          width: "15%",
          sortable: true,
          headerStyles: { background: "#1c274c" },
        },
        {
          label: "Дата последнего обновления",
          field: "date_update",
          width: "15%",
          sortable: true,
          headerStyles: { background: "#1c274c" },
        },
      ],
      rows: [],
      totalRecordCount: 0,
      sortable: {
        order: "id",
        sort: "asc",
      },
    });
    // Функция сортировки данных в таблице. Для сортировки используются переменные order и sort.
    // limit и offset были добавлены, так как этого требует функция.
    const doSearch = (limit, offset, order, sort) => {
      table.isLoading = true;
      EquipmentService.getEquipmentList(
        order,
        sort,
        search.value.length ? search.value : undefined
      ).then((res) => {
        res.forEach((elem) => {
          equipmentList.value.push(elem);
        });
        table.rows = res;
        table.sortable.order = order;
        table.sortable.sort = sort;
        table.isLoading = false;
      });
    };
    doSearch(0, 10, "equipment_id", "asc");

    const rowClicked = (isAdmin || isEmployee) && ((row) => {
      oldData.value = row;
      isNewEquipment.value = false;
      isVisible.value = true;
      console.log(row);
    });

    const downloadDocument = async () => {
      await EquipmentService.downloadFile(search.value);
    };

    const showModal = () => {
      isNewEquipment.value = true;
      isVisible.value = true;
    };

    const closeModal = () => {
      isVisible.value = false;
      oldData.value = {};
    };

    return {
      search,
      table,
      doSearch,
      rowClicked,
      isVisible,
      showModal,
      closeModal,
      downloadDocument,
      isNewEquipment,
      oldData,
      isAdmin,
      isEmployee,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-content: end;
  margin-right: 10px;
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
  background-image: url("../../assets/add-circle-svgrepo-com.svg");
  background-size: cover;
}

.add_row:hover {
  cursor: pointer;
}

.btn_download {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  background-image: url("../../assets/download_icon.svg");
  background-size: cover;
}

.btn_download:hover {
  cursor: pointer;
}

.bg_dark-blue {
  background: #1c274c !important;
}

.search {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.search__input {
    width: 50%;
    height: 30px;
    font-size: 16px;
    border: 1px solid black;
    border-radius: 5px;
    outline: none;
  }
  .search__btn {
    background: #1c274c;
    outline: none;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 10px 20px;
    transition: 0.5s ease;
    margin-left: 5px;
  }
  .search__btn:hover {
    cursor: pointer;
    transition: 0.5 ease;
    background: #314483;
  }
</style>
