import {
    BadRequestException,
    ForbiddenException,
    HttpStatus,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

export const catchError = (error: any) => {
    switch (error.status) {
        case HttpStatus.BAD_REQUEST:
            throw new BadRequestException(error.message);

        case HttpStatus.UNAUTHORIZED:
            throw new UnauthorizedException(error.message);

        case HttpStatus.FORBIDDEN:
            throw new ForbiddenException(error.message);

        case HttpStatus.NOT_FOUND:
            throw new NotFoundException(error.message);

        default:
            throw new BadRequestException(error.message);
    }
};
