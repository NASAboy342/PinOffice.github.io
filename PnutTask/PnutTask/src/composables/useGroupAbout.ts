import { ref } from "vue"
import { EnumGroupPosition } from "@/Models/Enums/EnumGroupPosition.js";

export function useGroupAbout(){
    const newMembersPosition = ref<EnumGroupPosition>(EnumGroupPosition.Member)
    const newMembersPositionAsString = ref<string>(newMembersPosition.value.toString());
    


    return{
        newMembersPosition
    }
}