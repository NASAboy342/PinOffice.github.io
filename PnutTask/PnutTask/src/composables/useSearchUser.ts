import { SearchUsersResponse } from "@/Models/Responses/SearchUsersResponse.js";
import { ApiCalling } from "@/utils/ApiCalling.js";
import { SearchUsersRequest } from "@/Models/Requests/SearchUsersRequest.js";
import { ref, watch } from "vue";
import { useAlertStatusStore } from "@/stores/useAlertStatusStore.js";
import { refDebounced } from '@vueuse/core';
export function UseSearchUser() {
  const alertStatus = useAlertStatusStore();
  const searchInput = ref<string>("");
  const searchResult = ref<SearchUsersResponse>(<SearchUsersResponse>{});
  const SearchUser = async () => {
    const req = ref<SearchUsersRequest>({
      userName: searchInput.value,
    });
    const result: SearchUsersResponse = await ApiCalling.SearchUser(req.value);
    if (result.errorCode !== 0) {
      alertStatus.SetAlert("error", result.errorMessage);
    }
    searchResult.value = result;
  };
  const progressiveSearchInput = refDebounced(searchInput, 300);
  watch(progressiveSearchInput, async () => {
    if (progressiveSearchInput.value !== ''){
        await SearchUser();
    }
  });
  return {
    SearchUser,
    searchInput,
    searchResult,
  };
}
