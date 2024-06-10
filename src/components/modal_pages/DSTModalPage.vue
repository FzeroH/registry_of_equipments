<template>
    <div class="modal" v-if="showModal">
        <div class="modal-content">
            <template v-if="$route.path === '/division'">
                <h2 v-if="isNewName">Добавить структурное подразделение</h2>
                <h2 v-else>Изменить структурное подразделение</h2>
            </template>
            <template v-if="$route.path === '/status'">
                <h2 v-if="isNewName">Добавить статус оборудования</h2>
                <h2 v-else>Изменить статус оборудования</h2>
            </template>


            <label for="name1" v-if="$route.path === '/division'">
                <input id="name1" 
                type="text" 
                placeholder="Введите название структурного подразделения" 
                v-model="divisionName"
                 class="equipment-field">
            </label>
            <label for="name3" v-if="$route.path === '/status'">
                <input id="name3" 
                type="text" 
                placeholder="Введите статус оборудования" 
                v-model="equipmentStatusName"
                 class="equipment-field">
            </label>

            <div class="button-block">
                <button @click="addNewName" v-if="isNewName">Добавить</button>
                <button @click="updateName" v-if="!isNewName">Изменить</button>
                <button @click="closeModal">Закрыть</button> 
            </div>
        </div>
    </div>
</template>
 
<script>
/* eslint-disable */
import { ref, onMounted } from 'vue';
import EquipmentService from '@/api/EquipmentService';
import { useRoute } from 'vue-router';

    export default {
        name: "DSTModalPage",
        props: {
            showModal: {
                type: Boolean,
                default: false,
            },
            isNewName: {
                type: Boolean,
                default: false,
            },
            oldData: {
                type: Object,
                default: null,
            },
        },
        setup(props, { emit }) {
            const route = useRoute();

            /* переменные для получения информации из формы */
            const divisionName = ref('');
            const equipmentStatusName = ref('');
            const equipmentTypeName = ref('');

            const closeModal = () => {
                divisionName.value = '';
                equipmentStatusName.value = '';
                equipmentTypeName.value = '';
                emit('closeModal', false);
            }
            
            const addNewName = async () => {
                try {
                    if(route.path === '/division') {
                        EquipmentService.addDivision(divisionName.value)
                    }

                    if(route.path === '/type') {
                        EquipmentService.addEquipmentType(equipmentTypeName.value)
                    }

                    if(route.path === '/status') {
                        EquipmentService.addEquipmentStatus(equipmentStatusName.value)
                    }
                }
                catch(e) {
                    console.log(e);
                }
                finally {
                    closeModal();
                    window.location.reload();
                }
            }

            const updateName = async () => {
                
                try {
                    if(route.path === '/division') {
                        EquipmentService.updateDivision(props.oldData.division_id, divisionName.value)
                    }

                    if(route.path === '/type') {
                        EquipmentService.updateEquipmentType(props.oldData.equipment_type_id, equipmentTypeName.value)
                    }

                    if(route.path === '/status') {
                        EquipmentService.updateEquipmentStatus(props.oldData.equipment_status_id, equipmentStatusName.value)
                    }
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
                if(props.oldData) {
                    if(route.path === '/division') {
                        divisionName.value = props.oldData.division_name;
                    }

                    if(route.path === '/type') {
                        equipmentTypeName.value = props.oldData.equipment_type_name;
                    }

                    if(route.path === '/status') {
                        equipmentStatusName.value = props.oldData.equipment_status_name;
                    }
                }
            }) 
        
            return {
                divisionName,
                equipmentTypeName,
                equipmentStatusName,
                closeModal, 
                addNewName, 
                updateName,
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