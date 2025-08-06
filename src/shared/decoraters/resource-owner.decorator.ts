import { SetMetadata } from "@nestjs/common";
import { RESOURCE_OWNER_KEY } from "../constants";
import { ResourceOwnerConfig } from "../types";

export const ResourceOwner = (config: ResourceOwnerConfig) => SetMetadata(RESOURCE_OWNER_KEY, config);