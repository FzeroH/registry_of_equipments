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
            <lable for="equipment_responsible_full_name"></lable>
            <select name="" id="equipment_responsible_full_name">
                <option selected>{{ baseData.equipmentResponsibleFullName }}</option>
                <option>TEST</option>
                <option>TEST</option>
                <option>TEST</option>
            </select>
            <lable for="equipment_status_name"></lable>
            <select name="" id="equipment_status_name">
                <option selected>{{ baseData.equipmentStatusName }}</option>
                <option>TEST</option>
                <option>TEST</option>
                <option>TEST</option>
            </select>
            <lable for="equipment_type_name"></lable>
            <select name="" id="equipment_type_name">
                <option selected>{{ baseData.equipmentStatusName }}</option>
                <option>TEST</option>
                <option>TEST</option>
                <option>TEST</option>
            </select>
            <div class="button-block">
                <button @click="closeModal">Добавить</button>
                <button @click="closeModal">Изменить</button>
                <button @click="closeModal">Закрыть</button>
            </div>
        </div>
    </div>
</template>
 
<script>
/* eslint-disable */
import { ref, defineEmits } from 'vue'

    export default {
        name: "ModalWindow",
        props: {
            showModal: {
                type: Boolean,
                default: false,
            }
        },
        setup(props, { emit }) {

            const baseData = {
                equipmentResponsibleFullName: 'ФИО мат. ответственного',
                equipmentStatusName: 'Статус оборудования',
                equipmentTypeName: 'Тип оборудования',
            }
            
            const equipmentName = ref('');
            const inventoryNumber = ref('');

            const closeModal = () => {
                equipmentName.value = '';
                inventoryNumber.value = '';
                emit('closeModal', false);
            }
        
            return { equipmentName, inventoryNumber, baseData, closeModal }
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