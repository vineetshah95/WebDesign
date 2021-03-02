import { PagesModule } from './pages.module';

describe('ComponentsModule', () => {
  let pagesModule: PagesModule;

  beforeEach(() => {
    pagesModule = new PagesModule();
  });

  it('should create an instance', () => {
    expect(pagesModule).toBeTruthy();
  });
});
