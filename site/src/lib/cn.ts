/** Join conditional class names. Kept out of the component files so they can
    export components only, which is what React Fast Refresh needs. */
export const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ')
