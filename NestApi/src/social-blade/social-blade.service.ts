import { Injectable } from '@nestjs/common';
import { SocialBlade } from './Model/social-blade-model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialBladeEntity } from 'src/Repository/Entity/SocialBladeEntity';

@Injectable()
export class SocialBladeService {
    socialBlade = new Array<SocialBlade>();
    constructor(@InjectRepository(SocialBladeEntity) private socialBladeRepo: Repository<SocialBladeEntity>) { }

    getSocialBladeData(): Promise<SocialBladeEntity[]> {
        return this.socialBladeRepo.find();
    }

    addSocialBladeData(socialBladeInformation: any) {
        socialBladeInformation && socialBladeInformation.forEach(element => {
            this.socialBladeRepo.insert(element);
        });
    }

    deleteSocialBladeData(id) {
        if (id != undefined) {
            this.socialBladeRepo.delete(id);
        }
    }
}
