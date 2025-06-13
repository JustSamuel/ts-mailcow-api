import {
  CreateRelayhostRequest,
  CreateTransportMapRequest,
  DeleteRoutingRequest,
  MailcowResponse,
  Relayhost,
  TransportMap,
} from '../types';
import MailcowClient from '../index';

/**
 * Interface for all Routing endpoints related to Mailcow.
 */
export interface RoutingEndpoints {
  /**
   * Creates a new Sender-Dependent Transport (Relayhost).
   * @param payload - Object containing details for the relayhost.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  createRelayhost(payload: CreateRelayhostRequest): Promise<MailcowResponse>;

  /**
   * Creates a new Transport Map.
   * @param payload - Object containing details for the transport map.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  createTransportMap(payload: CreateTransportMapRequest): Promise<MailcowResponse>;

  /**
   * Deletes specified Sender-Dependent Transports.
   * @param payload - Object containing list of relayhost IDs to delete.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  deleteRelayhost(payload: DeleteRoutingRequest): Promise<MailcowResponse>;

  /**
   * Deletes specified Transport Maps.
   * @param payload - Object containing list of transport map IDs to delete.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  deleteTransportMap(payload: DeleteRoutingRequest): Promise<MailcowResponse>;

  /**
   * Retrieves Sender-Dependent Transports by ID or all entries.
   * @param id - The relayhost ID or 'all' to retrieve all relayhosts.
   * @returns A promise that resolves to an array of `Relayhost` objects.
   */
  getRelayhost(id: string): Promise<Relayhost[]>;

  /**
   * Retrieves Transport Maps by ID or all entries.
   * @param id - The transport map ID or 'all' to retrieve all transport maps.
   * @returns A promise that resolves to an array of `TransportMap` objects.
   */
  getTransportMap(id: string): Promise<TransportMap[]>;
}

const ROUTING_ENDPOINTS = {
  CREATE_RELAYHOST: 'add/relayhost',
  CREATE_TRANSPORT_MAP: 'add/transport',
  DELETE_RELAYHOST: 'delete/relayhost',
  DELETE_TRANSPORT_MAP: 'delete/transport',
  GET_RELAYHOST: 'get/relayhost/',
  GET_TRANSPORT_MAP: 'get/transport/',
};

/**
 * Binder function between the MailcowClient class and the RoutingEndpoints.
 * @param bind - The MailcowClient instance to bind.
 * @internal
 */
export function routingEndpoints(bind: MailcowClient): RoutingEndpoints {
  return {
    createRelayhost(payload: CreateRelayhostRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, CreateRelayhostRequest>(
        ROUTING_ENDPOINTS.CREATE_RELAYHOST,
        payload,
      );
    },
    createTransportMap(payload: CreateTransportMapRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, CreateTransportMapRequest>(
        ROUTING_ENDPOINTS.CREATE_TRANSPORT_MAP,
        payload,
      );
    },
    deleteRelayhost(payload: DeleteRoutingRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, string[]>(ROUTING_ENDPOINTS.DELETE_RELAYHOST, payload.items);
    },
    deleteTransportMap(payload: DeleteRoutingRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, string[]>(ROUTING_ENDPOINTS.DELETE_TRANSPORT_MAP, payload.items);
    },
    getRelayhost(id: string): Promise<Relayhost[]> {
      return bind.requestFactory.get<Relayhost[]>(`${ROUTING_ENDPOINTS.GET_RELAYHOST}${id}`);
    },
    getTransportMap(id: string): Promise<TransportMap[]> {
      return bind.requestFactory.get<TransportMap[]>(`${ROUTING_ENDPOINTS.GET_TRANSPORT_MAP}${id}`);
    },
  };
}
