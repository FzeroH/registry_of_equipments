
<template>
    <div class="modal" v-if="showModal">
        <div class="modal-content">
            <h2 v-if="isNewResponsible">Добавить мат. ответственного</h2>
            <h2 v-else>Изменить данные мат. ответственного</h2>
            
            <label for="first_name">
                <input id="first_name" 
                type="text" 
                placeholder="Введите имя ответственного" 
                v-model="equipmentFirtsName"
                 class="equipment-field">
            </label>
            <label for="last_name">
                <input id="last_name" 
                type="text" 
                placeholder="Введите фамилию ответственного" 
                v-model="equipmentLastName"
                 class="equipment-field">
            </label>
            <label for="middle_name">
                <input id="middle_name" 
                type="text" 
                placeholder="Введите отчество ответственного" 
                v-model="equipmentSecondName"
                 class="equipment-field">
            </label>

            <select v-model="selectedDivision" id="division" class="equipment-field">
                <option :value="null" disabled selected>{{ baseData.divisionName }}</option>
                <option v-for="(item, index) in divisionList" :value="item" :key="index" >{{ item.division_name }}</option>
            </select>

            <div class="button-block">
                <button @click="addEquipmentResponsible" v-if="isNewResponsible">Добавить</button>
                <button @click="updateEquipmentResponsible" v-if="!isNewResponsible">Изменить</button>
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
        name: "ResponsibleModalPage",
        props: {
            showModal: {
                type: Boolean,
                default: false,
            },
            isNewResponsible: {
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
                divisionName: 'Выберете структурное подразделение',
            }

            /* переменные для получения информации из формы */
            const equipmentFirtsName = ref('');
            const equipmentLastName = ref('');
            const equipmentSecondName = ref('');
            const selectedDivision = ref(null);

            /* Массивы данных, полученных из базы */
            const divisionList = ref([]);

            const closeModal = () => {
                equipmentFirtsName.value = '';
                equipmentLastName.value = '';
                equipmentSecondName.value = '';
                selectedDivision.value = null;
                emit('closeModal', false);
            }
            
            const addEquipmentResponsible = async () => {
                const data = {
                    equipmentFirtsName: equipmentFirtsName.value,
                    equipmentLastName: equipmentLastName.value,
                    equipmentSecondName: equipmentSecondName.value,
                    selectedDivision: selectedDivision.value,
            };
            try {
                // console.log(data)
                await EquipmentService.addEquipmentResponsible(
                data.selectedDivision.division_id,data.equipmentFirtsName, data.equipmentSecondName, data.equipmentLastName,);
            }
            catch(e) {
                    console.log(e);
            }
            finally {
                closeModal();
                window.location.reload();
            }
        }
            const updateEquipmentResponsible = async () => {
                const data = {
                    equipmentFirtsName: equipmentFirtsName.value,
                    equipmentLastName: equipmentLastName.value,
                    equipmentSecondName: equipmentSecondName.value,
                    selectedDivision: selectedDivision.value,
            };

                try {
                    console.log(data)
                    EquipmentService.updateEquipmentResponsible(props.oldData.user_id,data.selectedDivision.division_id,data.equipmentFirtsName, data.equipmentSecondName, data.equipmentLastName, data.equipmentResponsiblePosition)
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
                EquipmentService.getDivisionList().then(res => {
                    res.forEach(elem => {
                        divisionList.value.push(elem)
                    });
                })

                if(props.oldData) {
                    const arraySplitName = props.oldData.equipment_responsible_full_name.split(' ');
                    const splitName = { 
                        first_name: arraySplitName[1],
                        last_name: arraySplitName[0],
                        middle_name: arraySplitName[2]
                    }
                    equipmentFirtsName.value = splitName.first_name;
                    equipmentLastName.value = splitName.last_name;
                    equipmentSecondName.value = splitName.middle_name;
                    equipmentResponsiblePosition.value = props.oldData.equipment_responsible_position;
                    
                    selectedDivision.value = { 
                        division_id: props.oldData.division_id,
                        division_name: props.oldData.division_name,
                    };
                }
            }) 
        
            return {
                equipmentFirtsName,
                equipmentLastName,
                equipmentSecondName,
                equipmentResponsiblePosition,
                selectedDivision,
                baseData, 
                closeModal, 
                addEquipmentResponsible, 
                updateEquipmentResponsible,
                divisionList
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