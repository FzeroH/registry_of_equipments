import instance from './config/axios.config';

class EquipmentService {
    static getEquipmentList = (order, sort) => new Promise((resolve, reject) => {
        instance.get('/equipments', { params: {
            order, 
            sort
        } })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

}


export default EquipmentService