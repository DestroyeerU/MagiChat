import { Request as DefaultRequest } from 'express';
import { ObjectID } from 'typeorm';

import { ParamsDictionary, Query } from './request';

export interface RequestAuthBody<B> extends DefaultRequest {
  userId?: ObjectID;
  body: B;
}

export interface RequestAuthParams<P extends ParamsDictionary> extends DefaultRequest {
  userId?: ObjectID;
  params: P;
}

export interface RequestAuthQuery<Q extends Query> extends DefaultRequest {
  userId?: ObjectID;
  query: Q;
}

export interface RequestAuth<B = never, Q extends Query = never, P extends ParamsDictionary = never>
  extends DefaultRequest {
  userId?: ObjectID;

  body: B;
  params: P;
  query: Q;
}

export interface RequestAuthBodyQueryParamsId<B, Q extends Query> extends DefaultRequest {
  userId?: ObjectID;

  body: B;
  query: Q;

  params: {
    id: string;
  };
}

export interface RequestAuthBodyParamsId<B> extends DefaultRequest {
  userId?: ObjectID;
  body: B;

  params: {
    id: string;
  };
}

export interface RequestAuthQueryParamsId<Q extends Query> extends DefaultRequest {
  userId?: ObjectID;
  query: Q;

  params: {
    id: string;
  };
}

export interface RequestAuthParamsId extends DefaultRequest {
  userId?: ObjectID;

  params: {
    id: string;
  };
}
