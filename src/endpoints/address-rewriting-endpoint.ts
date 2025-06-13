import MailcowClient from '..';
import {
  BccMapDeletionRequest,
  GetBccMapResponse,
  GetRecipientMapResponse,
  RecipientMapDeletionRequest,
  AddBccMapRequest as AddBccMapRequest,
  AddRecipientMapRequest as AddRecipientMapRequest,
  MailcowResponse,
} from '../types';

export interface AdressRewritingEndpoints {
  /**
   * Endpoint for creating a bcc map.
   * @param payload - The creation payload.
   */
  addBccMap(payload: AddBccMapRequest): Promise<MailcowResponse>;
  /**
   * Endpoint for creating a recipient map.
   * @param payload - The creation payload.
   */
  addRecipientMap(payload: AddRecipientMapRequest): Promise<MailcowResponse>;
  /**
   * Endpoint for deleting a bcc map.
   * @param payload - The deletion payload.
   */
  deleteBccMap(payload: BccMapDeletionRequest): Promise<MailcowResponse>;
  /**
   * Endpoint for deleting a recipient map.
   * @param payload - The deletion payload.
   */
  deleteRecipientMap(payload: RecipientMapDeletionRequest): Promise<MailcowResponse>;
  /**
   * Endpoint for getting a bcc map.
   * @param id - Id of the bcc map to get
   */
  getBccMap(id: number | 'all'): Promise<GetBccMapResponse>;
  /**
   * Endpoint for getting a recipient map.
   * @param id - Id of the recipient map to get
   */
  getRecipientMap(id: number | 'all'): Promise<GetRecipientMapResponse>;
}

const ADDRESS_REWRITING_ENDPOINTS = {
  ADD_BCC_MAP: 'add/bcc',
  ADD_RECIPIENT_MAP: 'add/recipient_map',
  DELETE_BCC_MAP: 'delete/bcc',
  DELETE_RECIPIENT_MAP: 'delete/recipient_map',
  GET_BCC_MAP: 'get/bcc',
  GET_RECIPIENT_MAP: 'get/recipient_map',
};

export function addressRewritingEndpoints(bind: MailcowClient): AdressRewritingEndpoints {
  return {
    addBccMap(payload: AddBccMapRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, AddBccMapRequest>(
        ADDRESS_REWRITING_ENDPOINTS.ADD_BCC_MAP,
        payload,
      );
    },

    addRecipientMap(payload: AddRecipientMapRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, AddRecipientMapRequest>(
        ADDRESS_REWRITING_ENDPOINTS.ADD_RECIPIENT_MAP,
        payload,
      );
    },

    deleteBccMap(payload: BccMapDeletionRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, BccMapDeletionRequest>(
        ADDRESS_REWRITING_ENDPOINTS.DELETE_BCC_MAP,
        payload,
      );
    },

    deleteRecipientMap(payload: RecipientMapDeletionRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, RecipientMapDeletionRequest>(
        ADDRESS_REWRITING_ENDPOINTS.DELETE_RECIPIENT_MAP,
        payload,
      );
    },

    getBccMap(id: number | 'all'): Promise<GetBccMapResponse> {
      return bind.requestFactory.get<GetBccMapResponse>(ADDRESS_REWRITING_ENDPOINTS.GET_BCC_MAP + `/${id}`);
    },

    getRecipientMap(id: number | 'all'): Promise<GetRecipientMapResponse> {
      return bind.requestFactory.get<GetRecipientMapResponse>(ADDRESS_REWRITING_ENDPOINTS.GET_RECIPIENT_MAP + `/${id}`);
    },
  };
}
