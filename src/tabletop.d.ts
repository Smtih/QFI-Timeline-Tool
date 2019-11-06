import "tabletop";

declare module "tabletop" {
  interface Options {
    key: string;
    callback?: (data: any) => void;
    simpleSheet?: boolean;
    parseNumbers?: boolean;
  }

  interface Sheet {
    elements: any[];
  }

  export function init(options: Options): Promise<{ [key: string]: Sheet }>;
}
