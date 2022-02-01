import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { SocialBladeService } from './social-blade.service';

@Controller('social-blade')
export class SocialBladeController {
    constructor(private socialBladeService: SocialBladeService) { }

    @Get()
    async getSocialBladeData(@Res() res) {
        try {
            const socialBlades = await this.socialBladeService.getSocialBladeData();
            return res.status(HttpStatus.OK).json(socialBlades);
        }
        catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                "An error has occured. Kindly try after some time. " + error
            )
        }
    }

    @Delete()
    async deleteSocialBladeData(@Query() queries, @Res() res) {

        try {
            if (queries != null) {
                let result = JSON.parse(JSON.stringify(queries));
                let resultIds = Object.values(result);
                let ids = JSON.parse('[' + resultIds + ']');
                ids && ids.forEach(async element => {
                    await this.socialBladeService.deleteSocialBladeData(element);
                });
                return res.status(HttpStatus.OK).json("Data has been deleted from DB");
            }
        }
        catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                "An error has occured while deleting. Kindly try after some time"
            );
        }
    }

    @HttpCode(202)
    @Post()
    async addSocialBladeData(@Body() socialBladeDto: any) {
        try {
            let result = JSON.parse(JSON.stringify(socialBladeDto));
            if (result != null && result != "") {
                let socialBladeData = Object.keys(result);
                let socialBladeDataList = JSON.parse('[' + socialBladeData + ']');
                await this.socialBladeService.addSocialBladeData(socialBladeDataList);
                return "The no of records which are inserted into the database are : " + socialBladeDataList.length;
            }
        }
        catch (error) {
            throw new HttpException("There is some error !! " + error + ".", 503);
        }
    }
}
