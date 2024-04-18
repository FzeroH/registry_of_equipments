<template>
    <div class="modal" v-if="showModal">
        <div class="modal-content">
            <h2 v-if="isNewEquipment">Добавить оборудование</h2>
            <h2 v-else>Изменить оборудование</h2>
            <label for="equipment_name">
                <input id="equipment_name" 
                type="text" 
                placeholder="Введите название оборудования" 
                v-model="computedEquipmentName">
            </label><label for="input2">
                <input id="inventory_number" 
                type="text" 
                placeholder="Введите инвентарный номер оборудования" 
                v-model="computedInventoryNumber">
            </label>
            <select v-model="computedSelectedResponsible" id="equipment_responsible_full_name">
                <option value="" disabled selected>{{ baseData.equipmentResponsibleFullName }}</option>
                <option v-for="(item, index) in responsibleList" :value="item" :key="index" >{{ item.equipment_responsible_full_name }}</option>  <!--({{ item.equipment_responsible_position }}) -->
            </select>
            <select v-model="computedSelectedStatus" id="equipment_status_name">
                <option value="" disabled selected>{{ baseData.equipmentStatusName }}</option>
                <option v-for="(item, index) in statusList" :value="item" :key="index" >{{ item.equipment_status_name }}</option>
            </select>
            <select v-model="computedSelectedType" id="equipment_type_name">
                <option value="" disabled selected>{{ baseData.equipmentTypeName }}</option>
                <option v-for="(item, index) in typesList" :value="item" :key="index" >{{ item.equipment_type_name }}</option>
            </select>
            <div class="button-block">
                <button type="submit" @click="addEquipment" v-if="isNewEquipment">Добавить</button>
                <button @click="updateEqipment" v-if="!isNewEquipment">Изменить</button>
                <button @click="closeModal">Закрыть</button>
            </div>
        </div>
    </div>
</template>
 
<script>
/* eslint-disable */
import { ref, onMounted, computed } from 'vue';
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
                default: {},
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
            const selectedType = ref({});
            const selectedStatus = ref({});
            const selectedResponsible = ref({});

            /* Массивы данных, полученных из базы */
            const typesList = ref([]);
            const statusList = ref([]);
            const responsibleList = ref([]);

            const computedEquipmentName = computed({
                get() {
                    return props.isNewEquipment? equipmentName.value : props.oldData.equipment_name;
                },
                set: (value) => { equipmentName.value = value } 

            });
            const computedInventoryNumber = computed({
                get() { 
                    return props.isNewEquipment? inventoryNumber.value : props.oldData.inventory_number;
                },
                set: (value) => { inventoryNumber.value = value } 
            });
            const computedSelectedType = computed( {
                get() { 
                    return props.isNewEquipment? selectedType.value : { 
                        equipment_type_id: props.oldData.equipment_type_id, 
                        equipment_type_name: props.oldData.equipment_type_name 
                };
                },
                set: (value) => { selectedType.value = value } 
            });
            const computedSelectedStatus = computed({
                get() { 
                    return props.isNewEquipment? selectedStatus.value : { 
                        equipment_status_id: props.oldData.equipment_status_id, 
                        equipment_status_name: props.oldData.equipment_status_name 
                    };
                },
                set: (value) => { selectedStatus.value = value } 
            });
            const computedSelectedResponsible = computed({
                get() {
                    return props.isNewEquipment? selectedResponsible.value : { 
                        equipment_responsible_id: props.oldData.equipment_responsible_id, 
                        equipment_responsible_full_name: props.oldData.equipment_responsible_full_name
                    }
                },
                set: (value) => { selectedResponsible.value = value } 
            });

            const closeModal = () => {
                equipmentName.value = '';
                inventoryNumber.value = '';
                selectedType.value = {};
                selectedStatus.value = {};
                selectedResponsible.value = {};
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
            console.log(data)
            await EquipmentService.addEquipment(data.selectedType.equipment_type_id,data.selectedStatus.equipment_status_id, data.selectedResponsible.equipment_responsible_id, data.equipmentName, data.inventoryNumber); 
            closeModal();
        }
            const updateEqipment = async () => {
                const data = {
                equipmentName: equipmentName.value,
                inventoryNumber: inventoryNumber.value,
                selectedType: selectedType.value,
                selectedStatus: selectedStatus.value,
                selectedResponsible: selectedResponsible.value,
            };
                console.log(data);
                try {
                    // EquipmentService.updateEquipment(props.oldData.equipment_id,data.selectedType.equipment_type_id,data.selectedStatus.equipment_status_id, data.selectedResponsible.equipment_responsible_id, data.equipmentName, data.inventoryNumber)
                }
                catch(e) {
                    console.log(e);
                }
                finally {
                    closeModal()
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
            })
        
            return {
                computedEquipmentName,
                computedInventoryNumber,
                computedSelectedType,
                computedSelectedStatus,
                computedSelectedResponsible,
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