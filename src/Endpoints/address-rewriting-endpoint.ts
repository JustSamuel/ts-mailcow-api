import MailcowClient from "..";
import { BccMapDeletionRequest, GetBccMapResponse, GetRecipientMapResponse, RecipientMapDeletionRequest, AddBccMapRequest as AddBccMapRequest, AddRecipientMapRequest as AddRecipientMapRequest, MailcowResponse } from "../types";

export interface AdressRewritingEndpoints {
  /**
   * Endpoint for creating a bcc map.
   * @param payload - The creation payload.
   */
  addBccMap(payload: AddBccMapRequest): Promise<MailcowResponse>
  /**
   * Endpoint for creating a recipient map.
   * @param payload - The creation payload.
   */
  addRecipientMap(payload: AddRecipientMapRequest): Promise<MailcowResponse>
  /**
  * Endpoint for deleting a bcc map.
  * @param payload - The deletion payload.
  */
  deleteBccMap(payload: BccMapDeletionRequest): Promise<MailcowResponse>
  /**
  * Endpoint for deleting a recipient map.
  * @param payload - The deletion payload.
  */
  deleteRecipientMap(payload: RecipientMapDeletionRequest): Promise<MailcowResponse>
  /**
  * Endpoint for getting a bcc map.
  * @param id - Id of the bcc map to get
  */
  getBccMap(id: number | 'all'): Promise<GetBccMapResponse>
  /**
  * Endpoint for getting a recipient map.
  * @param id - Id of the recipient map to get
  */
  getRecipientMap(id: number | 'all'): Promise<GetRecipientMapResponse>
}

export function adressRewritingEndpoints(bind: MailcowClient): AdressRewritingEndpoints {
  return {
    addBccMap(payload: AddBccMapRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/add/bcc',
        payload
      )
    },

    addRecipientMap(payload: AddRecipientMapRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/add/recipient_map',
        payload
      )
    },

    deleteBccMap(payload: BccMapDeletionRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/delete/bcc',
        payload
      )
    },

    deleteRecipientMap(payload: RecipientMapDeletionRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/delete/recipient_map',
        payload
      )
    },

    getBccMap(id: number | 'all'): Promise<GetBccMapResponse> {
      return bind.requestFactory.get<GetBccMapResponse>(
        `/api/v1/get/bcc/${id}`
      )
    },

    getRecipientMap(id: number | 'all'): Promise<GetRecipientMapResponse> {
      return bind.requestFactory.get<GetRecipientMapResponse>(
        `/api/v1/get/recipient_map/${id}`
      )
    }
  }
}
