export enum CommonStatusCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  OK = 200,
  CREATE = 201,
  BAD_REQUEST = 400,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export enum CommonStatusMessage {
  UNAUTHORIZED = "UNAUTHORIZED", // 인증 실패
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND", // 리소스 및 데이터 없음
  OK = "OK", // 정상 처리
  CREATE = "CREATE",
  BAD_REQUEST = "BAD_REQUEST", // 잘못된 요청
  CONFLICT = "CONFLICT", // 리소스 및 데이터 중복
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR", // 기타 예외 처리
}

export enum ErrorStatusMessage {
  GENERATE_REFRESH_TOKEN_KEY_FAIL = "generateRefreshTokenKey Failed - Empty Email",
  IS_NULL_REDIS = "Redis Object is null",
  IS_NULL_REPOSITORY = "Repository Object is null",
}
