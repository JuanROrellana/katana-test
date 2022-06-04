import {Controller, Get} from '@nestjs/common';

@Controller({
    path: 'api/decks',
    version: '1',
})
export class DecksController {
    @Get()
    get() {
        return 'Hello World';
    }
}
