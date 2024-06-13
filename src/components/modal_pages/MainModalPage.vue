<template>
    <div class="modal" v-if="showModal">
        <div class="modal-content">
            <h2 v-if="isNewEquipment">Добавить оборудование</h2>
            <h2 v-else>Изменить оборудование</h2>
            <label for="equipment_name">
                <input id="equipment_name" 
                type="text" 
                placeholder="Введите название оборудования" 
                v-model="equipmentName"
                 class="equipment-field">
            </label>
            <label for="inventory_number">
                <input id="inventory_number" 
                type="text" 
                placeholder="Введите инвентарный номер оборудования" 
                v-model="inventoryNumber"
                 class="equipment-field">
            </label>
            <label for="balance_cost">
                <input id="balance_cost" 
                type="text" 
                placeholder="Введите стоимость оборудования" 
                v-model="balanceCost"
                 class="equipment-field">
            </label>
            <label for="quantity">
                <input id="quantity" 
                type="text" 
                placeholder="Введите количество оборудования" 
                v-model="quantity"
                 class="equipment-field">
            </label>
            <label for="date_registration">
                <input id="date_registration" 
                type="date" 
                placeholder="Дата принятия к учету" 
                v-model="dateRegistration"
                 class="equipment-field">
            </label>
            <label for="date_de_registration">
                <input id="date_de_registration" 
                type="date" 
                placeholder="Дата снятия с учета" 
                v-model="dateDeRegistration"
                 class="equipment-field">
            </label>
            
            <select v-model="selectedResponsible" id="equipment_responsible_full_name" class="equipment-field">
                <option :value="null" disabled selected>{{ baseData.equipmentResponsibleFullName }}</option>
                <option v-for="(item, index) in responsibleList" :value="item" :key="index" >{{ item.equipment_responsible_full_name }}</option>
            </select>

            <select v-model="selectedStatus" id="equipment_status_name" class="equipment-field">
                <option :value="null" disabled selected>{{ baseData.equipmentStatusName }}</option>
                <option v-for="(item, index) in statusList" :value="item" :key="index" >{{ item.equipment_status_name }}</option>
            </select>

            <div class="button-block">
                <button @click="addEquipment" v-if="isNewEquipment">Добавить</button>
                <button @click="updateEqipment" v-if="!isNewEquipment">Изменить</button>
                <button @click="closeModal">Закрыть</button> 
            </div>
        </div>
    </div>
</template>
 
<script>
/* eslint-disable */
import { ref, onMounted } from 'vue';
import EquipmentService from '@/api/EquipmentService';

    export default {
        name: "MainModalPage",
        props: {
            showModal: {
                type: Boolean,
                default: false,
            },
            isNewEquipment: {
                type: Boolean,
                default: false,
            },
            oldData: {
                type: Object,
                default: null,
            },
        },
        setup(props, { emit }) {
            /* данные для заполнения первой строки */
            const baseData = {
                equipmentResponsibleFullName: 'ФИО мат. ответственного',
                equipmentStatusName: 'Статус оборудования',
            }

            /* переменные для получения информации из формы */
            const equipmentName = ref('');
            const inventoryNumber = ref('');
            const balanceCost = ref('');
            const quantity = ref('');
            const selectedStatus = ref(null);
            const selectedResponsible = ref(null);
            const dateRegistration = ref (null);
            const dateDeRegistration = ref (null);

            /* Массивы данных, полученных из базы */
            const typesList = ref([]);
            const statusList = ref([]);
            const responsibleList = ref([]);

            const closeModal = () => {
                equipmentName.value = '';
                inventoryNumber.value = '';
                balanceCost.value = '';
                quantity.value = '';
                selectedStatus.value = null;
                selectedResponsible.value = null;
                dateRegistration.value = null;
                dateDeRegistration.value = null;
                emit('closeModal', false);
            }
            
            const addEquipment = async () => {
                const data = {
                equipmentName: equipmentName.value,
                inventoryNumber: inventoryNumber.value,
                balance_cost: balanceCost.value,
                quantity: quantity.value,
                selectedStatus: selectedStatus.value,
                selectedResponsible: selectedResponsible.value,
                date_registration: dateRegistration.value,
                date_de_registration: dateDeRegistration.value,
            };

            await EquipmentService.addEquipment(
                data.selectedStatus.equipment_status_id, 
                localStorage.getItem('user_id'),
                data.selectedResponsible.user_id, 
                data.equipmentName, 
                data.inventoryNumber,
                data.balance_cost,
                data.quantity,
                data.date_registration,
                data.date_de_registration,
            ); 
            closeModal();
            window.location.reload();
        }
            const updateEqipment = async () => {
                const data = {
                equipmentName: equipmentName.value,
                inventoryNumber: inventoryNumber.value,
                balance_cost: balanceCost.value,
                quantity: quantity.value,
                selectedStatus: selectedStatus.value,
                selectedResponsible: selectedResponsible.value,
                date_registration: dateRegistration.value,
                date_de_registration: dateDeRegistration.value ? dateDeRegistration.value : null,
            };

                try {
                    console.log(data);
                    await EquipmentService.updateEquipment(props.oldData.equipment_id,data.selectedStatus.equipment_status_id, data.selectedResponsible.responsible_id, data.equipmentName, data.inventoryNumber, data.balance_cost, data.quantity, data.date_registration, data.date_de_registration)
                }
                catch(e) {
                    console.log(e);
                }
                finally {
                    closeModal();
                    window.location.reload();
                }

            }

            onMounted(async ()=> {
                await EquipmentService.getEquipmentStatusList().then(res => {
                    res.forEach(elem => {
                        statusList.value.push(elem)
                    });
                })
                await EquipmentService.getEquipmentResponsibleList().then(res => {
                    res.forEach(elem => {
                        responsibleList.value.push(elem)
                    });
                })
                
                if(props.oldData) {
                    console.log(JSON.stringify(props.oldData))
                    equipmentName.value = props.oldData.equipment_name;
                    inventoryNumber.value = props.oldData.inventory_number;
                    balanceCost.value = props.oldData.balance_cost.split(' ')[0];
                    quantity.value = props.oldData.quantity;
                    dateRegistration.value = props.oldData.date_registration;
                    dateDeRegistration.value = props.oldData.date_de_registration;
                    selectedResponsible.value = { 
                        responsible_id: props.oldData.responsible_id,
                        equipment_responsible_full_name: props.oldData.responsible_fullname,
                        division_id: props.oldData.division_id,
                        division_name: props.oldData.division_name
                    };
                    selectedStatus.value = { 
                        equipment_status_id: props.oldData.equipment_status_id,
                        equipment_status_name: props.oldData.equipment_status_name,
                    };
                }
            }) 
        
            return {
                equipmentName,
                inventoryNumber,
                selectedStatus,
                selectedResponsible,
                inventoryNumber, 
                baseData,
                balanceCost,
                quantity,
                dateRegistration,
                dateDeRegistration,
                closeModal, 
                addEquipment, 
                updateEqipment,
                typesList, 
                statusList, 
                responsibleList,
            }
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
        z-index: 2;
        } 

    .modal-content { 
        display: flex;
        flex-direction: column;
        background-color: #fff; 
        padding: 20px; 
        border-radius: 5px; 
    } 

    h2 {
        font-size: 20px;
        color: #1c274c;
        font-weight: bold;
        margin: auto;
        padding-bottom: 20px;
    }
    input {
        width: 400px;
    }
    select {
        width: 408px;
    }
    .equipment-field {
        height: 40px;
        font-size: 16px;
        margin-bottom: 10px;
        border: 1px solid black;
        border-radius: 5px;
        outline: none;
        
    }

    .button-block {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    button {
        background: #1c274c;
        outline: none;
        border: none;
        border-radius: 10px;
        color: white;
        padding: 10px 20px;
        transition: 0.5s ease;
    }

    button:hover {
        cursor: pointer;
        transition: 0.5 ease;
        background: #314483;
    }

</style>