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
            </label><label for="input2">
                <input id="inventory_number" 
                type="text" 
                placeholder="Введите инвентарный номер оборудования" 
                v-model="inventoryNumber"
                 class="equipment-field">
            </label>
            
            <select v-model="selectedResponsible" id="equipment_responsible_full_name" class="equipment-field">
                <option :value="null" disabled selected>{{ baseData.equipmentResponsibleFullName }}</option>
                <option v-for="(item, index) in responsibleList" :value="item" :key="index" >{{ item.equipment_responsible_full_name }}</option>  <!--({{ item.equipment_responsible_position }}) -->
            </select>

            <select v-model="selectedStatus" id="equipment_status_name" class="equipment-field">
                <option :value="null" disabled selected>{{ baseData.equipmentStatusName }}</option>
                <option v-for="(item, index) in statusList" :value="item" :key="index" >{{ item.equipment_status_name }}</option>
            </select>

            <select v-model="selectedType" id="equipment_type_name" class="equipment-field">
                <option :value="null" disabled selected>{{ baseData.equipmentTypeName }}</option>
                <option v-for="(item, index) in typesList" :value="item" :key="index" >{{ item.equipment_type_name }}</option>
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
        name: "DialogPage",
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
                equipmentTypeName: 'Тип оборудования',
            }

            /* переменные для получения информации из формы */
            const equipmentName = ref('');
            const inventoryNumber = ref('');
            const selectedType = ref(null);
            const selectedStatus = ref(null);
            const selectedResponsible = ref(null);

            /* Массивы данных, полученных из базы */
            const typesList = ref([]);
            const statusList = ref([]);
            const responsibleList = ref([]);

            const closeModal = () => {
                equipmentName.value = '';
                inventoryNumber.value = '';
                selectedType.value = null;
                selectedStatus.value = null;
                selectedResponsible.value = null;
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
            window.location.reload();
        }
            const updateEqipment = async () => {
                const data = {
                equipmentName: equipmentName.value,
                inventoryNumber: inventoryNumber.value,
                selectedType: selectedType.value,
                selectedStatus: selectedStatus.value,
                selectedResponsible: selectedResponsible.value,
            };

                try {
                    EquipmentService.updateEquipment(props.oldData.equipment_id,data.selectedType.equipment_type_id,data.selectedStatus.equipment_status_id, data.selectedResponsible.equipment_responsible_id, data.equipmentName, data.inventoryNumber)
                }
                catch(e) {
                    console.log(e);
                }
                finally {
                    closeModal();
                    window.location.reload();
                }

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
                
                if(props.oldData) {
                    console.log('oldDATA')
                    equipmentName.value = props.oldData.equipment_name;
                    inventoryNumber.value = props.oldData.inventory_number;
                    selectedResponsible.value = { 
                        equipment_responsible_id: props.oldData.equipment_responsible_id,
                        equipment_responsible_full_name: props.oldData.equipment_responsible_full_name,
                        division_id: props.oldData.division_id,
                        division_name: props.oldData.division_name,
                        equipment_responsible_position: props.oldData.equipment_responsible_position,
                    };
                    selectedStatus.value = { 
                        equipment_status_id: props.oldData.equipment_status_id,
                        equipment_status_name: props.oldData.equipment_status_name,
                    };
                    selectedType.value = { 
                        equipment_type_id: props.oldData.equipment_type_id,
                        equipment_type_name: props.oldData.equipment_type_name,
                    };
                }
            }) 
        
            return {
                equipmentName,
                inventoryNumber,
                selectedType,
                selectedStatus,
                selectedResponsible,
                inventoryNumber, 
                baseData, 
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