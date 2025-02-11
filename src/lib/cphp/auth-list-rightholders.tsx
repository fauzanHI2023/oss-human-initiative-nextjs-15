import axios from "axios";

interface Rightholder {
    id: string;
    form_name: string;
    form_description: string;
    link: string;
    end_datetime: string;
  }  

export const fetchRightholders = async (): Promise<Rightholder[]>  => {
    const apiUrl = 'http://projectx.api/cphp/form-list';
    try {
        const response = await axios.get(apiUrl);
        return response.data.data;
    } catch (error) {
        console.log("Error fetching campaign", error);
        return [];
    }
}