import {
  Request,
  RequestValidation,
  emptyRequestValidation,
} from '../model/Request';

export const validateRequestForSave = (
  request: Request,
  renew: boolean,
): RequestValidation => {
  const validation = emptyRequestValidation();
  const MANDATORY_FIELD = 'Champ Obligatoire';

  if (!request.account) {
    validation.account = MANDATORY_FIELD;
  }

  if (!request.card && renew) {
    validation.card = MANDATORY_FIELD;
  }

  if (!request.cardType) {
    validation.cardType = MANDATORY_FIELD;
  }

  if (!request.nameOnCard) {
    validation.nameOnCard = MANDATORY_FIELD;
  }
  if (!request.renewMonth && renew) {
    validation.renewMonth = MANDATORY_FIELD;
  }
  if (!request.smsLang) {
    validation.smsLang = MANDATORY_FIELD;
  }
  return validation;
};
export const isValid = (validation: RequestValidation): boolean => {
  let valid = true;
  if (validation.account) {
    valid = false;
  }

  if (validation.card) {
    valid = false;
  }

  if (validation.cardType) {
    valid = false;
  }

  if (validation.nameOnCard) {
    valid = false;
  }
  if (validation.renewMonth) {
    valid = false;
  }

  if (validation.smsLang) {
    valid = false;
  }
  return valid;
};
