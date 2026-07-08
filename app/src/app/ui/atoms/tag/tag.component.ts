import { Component, input } from '@angular/core';

export enum TagVariantEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export type TagProps = {
  label: string;
  variant: TagVariantEnum;
};

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  label = input.required<TagProps['label']>();
  variant = input<TagProps['variant']>(TagVariantEnum.SECONDARY);
}
