import "tabletop";

declare module "tabletop" {
  interface Options {
    key: string;
    callback?: (data: any) => void;
    simpleSheet?: boolean;
    parseNumbers?: boolean;
  }

  export function init(options: Options): Promise<any>;
}
