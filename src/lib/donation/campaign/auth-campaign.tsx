import axios from "axios";

export const fetchCampaign = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/donation/campaign-api`;
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_API_KEY_CAMPAIGN || "",
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching campaign", error);
        return null;
    }
}

export const fetchCampaignIndividuDisaster = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/donation/campaign/individu/disaster`;
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_API_KEY_CAMPAIGN_DISASTER || "",
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching campaign", error);
    }
}

export const fetchCampaignIndividuChildren = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/donation/campaign/individu/children`;
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_API_KEY_CAMPAIGN_CHILDREN || "",
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching campaign", error);
    }
}

export const fetchCampaignIndividuEmpowerment = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/donation/campaign/individu/empowerment`;
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_API_KEY_CAMPAIGN_EMPOWERMENT || "",
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching campaign", error);
    }
}

export const fetchCampaignIndividuInfrastructure = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/donation/campaign/individu/Infrastructure`;
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_API_KEY_CAMPAIGN_INFRASTRUCTURE || "",
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching campaign", error);
    }
}