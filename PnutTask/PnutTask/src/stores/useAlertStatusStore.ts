import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStatusStore = defineStore('alertStatus', () => {
    const typeToDisplay = ref('');
    const descriptionToDisplay = ref('');
    const ClearAlert = () => {
        typeToDisplay.value = '';
        descriptionToDisplay.value = '';
    }
    const SetAlert = (type: string, description: string) => {
        typeToDisplay.value = type;
        descriptionToDisplay.value = description;
    }
    return{
        typeToDisplay,
        descriptionToDisplay,
        ClearAlert,
        SetAlert
    }
});