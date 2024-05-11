import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','password','email']);

export const UserTwitchTokenDataScalarFieldEnumSchema = z.enum(['userId','accessToken','expiresIn','obtainmentTimestamp','refreshToken','scope']);

export const TtsConfigScalarFieldEnumSchema = z.enum(['id','userId','enabled','channel','voice','engine']);

export const TriggersScalarFieldEnumSchema = z.enum(['id','userId','name','event','conditions']);

export const TriggerActionsScalarFieldEnumSchema = z.enum(['id','userId','triggerId','data']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
})

export type User = z.infer<typeof UserSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  TtsConfig?: TtsConfigWithRelations | null;
  UserTwitchTokenData?: UserTwitchTokenDataWithRelations | null;
  triggers: TriggersWithRelations[];
  triggerActions: TriggerActionsWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  TtsConfig: z.lazy(() => TtsConfigWithRelationsSchema).nullable(),
  UserTwitchTokenData: z.lazy(() => UserTwitchTokenDataWithRelationsSchema).nullable(),
  triggers: z.lazy(() => TriggersWithRelationsSchema).array(),
  triggerActions: z.lazy(() => TriggerActionsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// USER TWITCH TOKEN DATA SCHEMA
/////////////////////////////////////////

export const UserTwitchTokenDataSchema = z.object({
  userId: z.number().int(),
  accessToken: z.string(),
  expiresIn: z.number().int().nullable(),
  obtainmentTimestamp: z.bigint(),
  refreshToken: z.string().nullable(),
  scope: z.string().array(),
})

export type UserTwitchTokenData = z.infer<typeof UserTwitchTokenDataSchema>

// USER TWITCH TOKEN DATA RELATION SCHEMA
//------------------------------------------------------

export type UserTwitchTokenDataRelations = {
  user: UserWithRelations;
};

export type UserTwitchTokenDataWithRelations = z.infer<typeof UserTwitchTokenDataSchema> & UserTwitchTokenDataRelations

export const UserTwitchTokenDataWithRelationsSchema: z.ZodType<UserTwitchTokenDataWithRelations> = UserTwitchTokenDataSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// TTS CONFIG SCHEMA
/////////////////////////////////////////

export const TtsConfigSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  enabled: z.boolean(),
  channel: z.string(),
  voice: JsonValueSchema.nullable(),
  engine: z.string(),
})

export type TtsConfig = z.infer<typeof TtsConfigSchema>

// TTS CONFIG RELATION SCHEMA
//------------------------------------------------------

export type TtsConfigRelations = {
  user: UserWithRelations;
};

export type TtsConfigWithRelations = z.infer<typeof TtsConfigSchema> & TtsConfigRelations

export const TtsConfigWithRelationsSchema: z.ZodType<TtsConfigWithRelations> = TtsConfigSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// TRIGGERS SCHEMA
/////////////////////////////////////////

export const TriggersSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  name: z.string(),
  event: z.string(),
  /**
   * [PrismaJson.TriggerCondition]
   */
  conditions: JsonValueSchema,
})

export type Triggers = z.infer<typeof TriggersSchema>

// TRIGGERS RELATION SCHEMA
//------------------------------------------------------

export type TriggersRelations = {
  user: UserWithRelations;
  actions: TriggerActionsWithRelations[];
};

export type TriggersWithRelations = Omit<z.infer<typeof TriggersSchema>, "conditions"> & {
  conditions?: JsonValueType | null;
} & TriggersRelations

export const TriggersWithRelationsSchema: z.ZodType<TriggersWithRelations> = TriggersSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  actions: z.lazy(() => TriggerActionsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// TRIGGER ACTIONS SCHEMA
/////////////////////////////////////////

export const TriggerActionsSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  triggerId: z.number().int(),
  /**
   * [PrismaJson.TriggerActionTts]
   */
  data: JsonValueSchema.nullable(),
})

export type TriggerActions = z.infer<typeof TriggerActionsSchema>

// TRIGGER ACTIONS RELATION SCHEMA
//------------------------------------------------------

export type TriggerActionsRelations = {
  user: UserWithRelations;
  trigger: TriggersWithRelations;
};

export type TriggerActionsWithRelations = z.infer<typeof TriggerActionsSchema> & TriggerActionsRelations

export const TriggerActionsWithRelationsSchema: z.ZodType<TriggerActionsWithRelations> = TriggerActionsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  trigger: z.lazy(() => TriggersWithRelationsSchema),
}))
