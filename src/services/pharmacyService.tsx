import { AxiosRequestConfig } from "axios";
import { request } from "../lib/api";

export interface NewPharmacyData {
  name: string;
  manufacturer: string;
  description: string;
  quantity: number;
  price: number;
  unit: string;
  form: string;
}

interface Medication {
  medicationId: string;
  quantity: any;
  duration: string;
}

interface OutOfStockDrug {
  drug: string;
  quantity: any;
  duration: string;
}

export interface TreatmentData {
  consultationId: string;
  text: string;
  medication: Medication[];
  unavailable: OutOfStockDrug[];
}

class pharmacyService {
  public async addPharmacy(data: NewPharmacyData) {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: "/medication",
      data,
    };
    const response = await request(options);
    return response;
  }

  public async getPharmacy() {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: "/medications",
    };
    const response = await request(options);
    return response;
  }

  public async getPharmacyById(id: string) {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `/medication/${id}`,
    };
    const response = await request(options);
    return response;
  }

  public async updatePharmacy(id: string, data: NewPharmacyData) {
    const options: AxiosRequestConfig = {
      method: "PUT",
      url: `/medication/${id}`,
      data,
    };
    const response = await request(options);
    return response;
  }

  public async deletePharmacy(id: string) {
    const options: AxiosRequestConfig = {
      method: "DELETE",
      url: `/medication/${id}`,
    };
    return request(options);
  }

  //Pharmacy Order
  public async addTreatment(data: TreatmentData) {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: "/treatment",
      data,
    };
    const response = await request(options);
    return response;
  }

  public async getTreatments() {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: "/treatments",
    };
    const response = await request(options);
    return response;
  }

  public async getTreatmentById(id: string) {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `/treatment/${id}`,
    };
    const response = await request(options);
    return response;
  }

  public async getUserTreatment(id: string) {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `/treatment/user/${id}`,
    };
    const response = await request(options);
    return response;
  }

  public async updateTreatment(id: string, data: TreatmentData) {
    const options: AxiosRequestConfig = {
      method: "PUT",
      url: `/treatment/${id}`,
      data,
    };
    const response = await request(options);
    return response;
  }

  public async confirmTreatment(id: any, data: { dispensed: any }) {
    const options: AxiosRequestConfig = {
      method: "PUT",
      url: `/treatment/${id}`,
      data,
    };
    const response = await request(options);
    return response;
  }

  public async deleteTreatment(id: string) {
    const options: AxiosRequestConfig = {
      method: "DELETE",
      url: `/treatment/${id}`,
    };
    return request(options);
  }
}

export default new pharmacyService();
