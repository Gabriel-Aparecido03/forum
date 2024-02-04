import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CryptographyModule } from "./cryptography/cryptography.module";
import { EventsModule } from "./events/event.module";
import { HttpModule } from "./http/http.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [HttpModule,DatabaseModule,CryptographyModule,AuthModule,EventsModule],
})
export class AppModule{}
