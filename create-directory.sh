#!/bin/bash

# Navigate to the src directory
cd src

# Create config folder and files
mkdir -p config
touch config/configuration.ts
touch config/validation-schema.ts

# Create core structure
mkdir -p core/constants
touch core/constants/roles.enum.ts

mkdir -p core/decorators
touch core/decorators/roles.decorator.ts
touch core/decorators/current-user.decorator.ts

mkdir -p core/guards
touch core/guards/jwt-auth.guard.ts
touch core/guards/roles.guard.ts

mkdir -p core/filters
touch core/filters/http-exception.filter.ts

mkdir -p core/interceptors
touch core/interceptors/logging.interceptor.ts

mkdir -p core/validators
touch core/validators/mongo-id.validator.ts

# Create domain structure for meeting and user
mkdir -p domain/meeting/entities
touch domain/meeting/entities/meeting.entity.ts

mkdir -p domain/meeting/repositories
touch domain/meeting/repositories/meeting.repository.interface.ts
touch domain/meeting/repositories/meeting.repository.ts

mkdir -p domain/meeting/dto
touch domain/meeting/dto/create-meeting.dto.ts
touch domain/meeting/dto/update-meeting.dto.ts

mkdir -p domain/meeting/interfaces
touch domain/meeting/interfaces/meeting.interface.ts

mkdir -p domain/meeting/services
touch domain/meeting/services/meeting.service.ts

mkdir -p domain/user/entities
touch domain/user/entities/user.entity.ts

mkdir -p domain/user/repositories
touch domain/user/repositories/user.repository.interface.ts
touch domain/user/repositories/user.repository.ts

mkdir -p domain/user/dto
touch domain/user/dto/create-user.dto.ts
touch domain/user/dto/update-user.dto.ts

mkdir -p domain/user/interfaces
touch domain/user/interfaces/user.interface.ts

mkdir -p domain/user/services
touch domain/user/services/user.service.ts

# Create infrastructure structure
mkdir -p infrastructure/database/mongodb
touch infrastructure/database/mongodb/mongodb.module.ts
touch infrastructure/database/mongodb/mongodb.service.ts

mkdir -p infrastructure/database/schemas
touch infrastructure/database/schemas/meeting.schema.ts
touch infrastructure/database/schemas/user.schema.ts

mkdir -p infrastructure/logger
touch infrastructure/logger/logger.service.ts

# Create presentation structure
mkdir -p presentation/controllers
touch presentation/controllers/meeting.controller.ts
touch presentation/controllers/user.controller.ts

mkdir -p presentation/middlewares
touch presentation/middlewares/auth.middleware.ts

# Create shared structure
mkdir -p shared/types
touch shared/types/index.ts

mkdir -p shared/utils
touch shared/utils/date.util.ts

echo "Directory structure created successfully."
