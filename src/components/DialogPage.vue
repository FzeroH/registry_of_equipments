<template>
    <div class="modal" v-if="showModal">
        <div class="modal-content">
            <h2>Название</h2>
            <label for="equipment_name">
                <input id="equipment_name" 
                type="text" 
                placeholder="Введите название оборудования" 
                v-model="equipmentName">
            </label><label for="input2">
                <input id="inventory_number" 
                type="text" 
                placeholder="Введите инвентарный номер оборудования" 
                v-model="inventoryNumber">
            </label>
            <select v-model="selectedResponsible" id="equipment_responsible_full_name">
                <option value="" disabled selected>{{ baseData.equipmentResponsibleFullName }}</option>
                <option v-for="(item, index) in responsibleList" :value="item" :key="index" >{{ item.equipment_responsible_full_name }} ({{ item.equipment_responsible_position }})</option>
            </select>
            <select v-model="selectedStatus" id="equipment_status_name">
                <option value="" disabled selected>{{ baseData.equipmentStatusName }}</option>
                <option v-for="(item, index) in statusList" :value="item" :key="index" >{{ item.equipment_status_name }}</option>
            </select>
            <select v-model="selectedType" id="equipment_type_name">
                <option value="" disabled selected>{{ baseData.equipmentTypeName }}</option>
                <option v-for="(item, index) in typesList" :value="item" :key="index" >{{ item.equipment_type_name }}</option>
            </select>
            <div class="button-block">
                <button @click="addEquipment" v-if="isNewEquipment">Добавить</button>
                <button @click="closeModal" v-if="!isNewEquipment">Изменить</button>
                <button @click="closeModal">Закрыть</button>
            </div>
        </div>
    </div>
</template>
 
<script>
/* eslint-disable */
import { ref, defineEmits, onMounted } from 'vue';
import EquipmentService from '@/api/EquipmentService';

    export default {
        name: "ModalWindow",
        props: {
            showModal: {
                type: Boolean,
                default: false,
            },
            isNewEquipment: {
                type: Boolean,
                default: true,
            },
        },
        setup(props, { emit }) {
            /* данные для заполнения первой строки */
            const baseData = {
                equipmentResponsibleFullName: 'ФИО мат. ответственного',
                equipmentStatusName: 'Статус оборудования',
                equipmentTypeName: 'Тип оборудования',
            }
            /* переменные для получения информации из формы */
            const equipmentName = ref('');
            const inventoryNumber = ref('');
            const selectedType = ref();
            const selectedStatus = ref();
            const selectedResponsible = ref();

            /* Массивы данных, полученных из базы */
            const typesList = ref([]);
            const statusList = ref([]);
            const responsibleList = ref([]);

            const closeModal = () => {
                equipmentName.value = '';
                inventoryNumber.value = '';
                emit('closeModal', false);
            }
            
            const addEquipment = async () => {
                const data = {
                equipmentName: equipmentName.value,
                inventoryNumber: inventoryNumber.value,
                selectedType: selectedType.value,
                selectedStatus: selectedStatus.value,
                selectedResponsible: selectedResponsible.value,
            };
            await EquipmentService.addEquipment(data.selectedType.equipment_type_id,data.selectedStatus.equipment_status_id, data.selectedResponsible.equipment_responsible_id, data.equipmentName, data.inventoryNumber); 
            closeModal();
            console.log('WoRK!');
        }

            onMounted(()=> {
                EquipmentService.getEquipmentTypeList().then(res => {
                    res.forEach(elem => {
                        typesList.value.push(elem)
                    });
                })
                EquipmentService.getEquipmentStatusList().then(res => {
                    res.forEach(elem => {
                        statusList.value.push(elem)
                    });
                })
                EquipmentService.getEquipmentResponsibleList().then(res => {
                    res.forEach(elem => {
                        responsibleList.value.push(elem)
                    });
                })
            })
        
            return { equipmentName, inventoryNumber, baseData, 
                closeModal, addEquipment,
                typesList, statusList, 
                responsibleList, selectedType, selectedResponsible, selectedStatus }
        }
    }
</script>
 
<style scoped>
 /* Стили для модального окна */ 
    .modal { 
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        background-color: rgba(0, 0, 0, 0.5); 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        } 

    .modal-content { 
        display: flex;
        flex-direction: column;
        background-color: #fff; 
        padding: 20px; 
        border-radius: 5px; 
    } 

    input, select { 
        width: 30rem;
        margin-bottom: 10px;
    } 

    .button-block {
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    button { 
        max-width: 10rem;
        margin-top: 10px; 
    } 
</style>