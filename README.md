# Cumulus Networks Test Documentation Site

This a development website for Cumulus Networks Technical Documentation.
The site is built with the static site generator [Hugo](https://gohugo.io/documentation/)

## Installing the Test Documentation Site

In order to run the site locally

1. Install Hugo
    - https://gohugo.io/getting-started/installing/

2. Verify Hugo is installed with `hugo version`

3. Clone this repository

4. Navigate to the testDocs directory

5. Start the hugo server with `hugo server`

The site will be available at http://localhost:1313

## Contributing

The master branch hosts the current, most stable version of the site
Dev branch contains the unstable version, where new features and content are added continually.

If you would like to contribute to the site, please fork and submit a pull request

## Content with Hugo

All site content in hugo is written in Markdown, and hosted in the /content folder.
The site is built with the file tree and organization of this folder.

Sections in hugo are subdirectories that contain a `_index.md` file.
Content is ordered by the weight parameter in the file front matter.
Articles with `draft: true` in the front matter will not be built
use `hugo server -D` to include drafts

## Theme

Theme netDocs is forked from the Book Hugo theme.
Some features added from docDock Hugo theme

## Resources
  - [Cumulus Networks Documentation](https://docs.cumulusnetworks.com)
  - [Content Organization with Hugo](https://gohugo.io/content-management/organization/)
  - [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#lists)
  - [hugo-theme-book](https://github.com/alex-shpak/hugo-book)
  - [hugo-theme-dockdock](https://github.com/vjeantet/hugo-theme-docdock)
