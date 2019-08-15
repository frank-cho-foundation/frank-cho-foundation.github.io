#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void parse_title(char *title);
int get_max_line_chars(FILE *const fin);
int starts_with(const char *src, const char *prefix);


void parse_title(char *title){
    char temp[256];
    char index = 0;
    for(int i = 0; i < strlen(title); i++) {
        if (title[i] == ':'){
            temp[index] = '&'; // replace : with &#58;
            index++;
            temp[index] = '#';
            index++;
            temp[index] = '5';
            index++;
            temp[index] = '8';
            index++;
            temp[index] = ';';
            index++;
        } else if (title[i] == '(') {
            temp[index] = '\0';
            break; // strip everything after and including (
        } else {
            temp[index] = title[i];
            index++;
        }
    }
    strcpy(title, temp);
}

// return: caracters of each line in the file, -1 if reach the end of file
int get_max_line_chars(FILE *const fin){
    int c;

    int max = 0;
    while(1){
        if (c == EOF){  // stop if reach the end of file
            return max;
        }
        int count = 0; // initialize count to 0 after reading a line
        while(1){   // get the max line characters
            c = fgetc(fin);
            if (c == '\n' | c == EOF){
                break;
            }
            count++;
        }
        if (count > max){   // compare max with count
            max = count;
        }
    }
}

// check if src starts with prefix
// return 1 if true, 0 if false
int starts_with(const char* src, const char *prefix){
    if (strncmp(src, prefix, strlen(prefix)) == 0) {
        return 1;
    }
    return 0;
}


// read film info from txt file, and write info of each film to separate md file
// title: "2019-6-30-`film number`"
// text format:
// ---
// layout: film_post
// title:
// language:
// media:
// category:
// producer:
// year:
// ---
// `sumary`
int main(){
    FILE *fin;
    FILE *fout;
    char *fname = "war-crime-catalog.txt";

    fin = fopen(fname, "r");   // open the file
    if (fin == NULL) {                             // exit if open fails
        printf("fail to open the file\n");
        exit(1);
    }

    int const MAX_CHARS = get_max_line_chars(fin) + 1;  // set the max chars of a line
    fclose(fin);

    fin = fopen(fname, "r");   // open the file

    char line[MAX_CHARS];
    char title[256];
    int num = 0;        
    char var[32];
    char value[2048];


    while(fgets(line, MAX_CHARS, fin) != NULL){    // read a line, terminate if reach EOF
        if(line[0] == '\n'){ // an empty line
            printf("finish writing\n");
            fclose(fout);
            continue;
        }

        if (sscanf(line, "%d. %[^(\n]", &num, title) == 2) { // title line
            char fname[32];
            snprintf(fname, 32, "2019-6-30-%d.md", num);    // open out file
            fout = fopen(fname, "w"); 
            fprintf(fout, "---\n"); // start front matter
            fprintf(fout, "layout: film_post\n");
            fprintf(fout, "title: \"%s\"\n", title);
            printf("start writing '%s'\n",fname);
            continue;
        }
        
        sscanf(line, "%[^:]%*[: ]%[^\n]", var, value); // strip the variable name and value

        if (strcmp(var, "Language") == 0){  // write to front matter
            fprintf(fout, "language: \"%s\"\n", value);
        } else if (strcmp(var, "Media Type") == 0){
            fprintf(fout, "media: \"%s\"\n", value);
        } else if (strcmp(var, "Category") == 0){
            fprintf(fout, "category: \"%s\"\n", value);
        } else if (strcmp(var, "Producer") == 0){
            fprintf(fout, "producer: \"%s\"\n", value);
        } else if (strcmp(var, "Year Created") == 0){
            fprintf(fout, "year: \"%s\"\n", value);
            fprintf(fout, "---\n\n");  // end front matter
        } else if (strcmp(var, "Summary") == 0){
            fprintf(fout, "%s\n", value);
        } else {
            printf("error: invalid variable: %s", line);
        }

        // zero out the length of string
        var[0] = '\0';
        value[0] = '\0';
        title[0] = '\0';

    }

    fclose(fin);
    return 0;
}
