import re
import os

info_dict = {
    "title" : "",
    "filename" : "",
    "file" : "",
    "link" : "",
    "government_id" : "",
    "release_time" : "",
    "publisher": "",
    "issue_time" : "",
    "summary": ""
}

def write_info(info_dict: dict):
    id = info_dict["government_id"]
    fname = f"2019-8-14-{id}.md"
    with open(fname, "w") as fh:
        fh.write("---\n")
        fh.write("layout: doc_post\n")
        for key in info_dict.keys():
            if key == "summary":    # DONOT write summary to front matter
                continue
            value = info_dict[key]
            fh.write(f'{key}: "{value}"\n')
        # handle summary
        fh.write("---\n")
        summary = info_dict["summary"]
        fh.write(f"{summary}\n")

fname = os.path.abspath("comfort-women-doc.txt")


with open(fname) as fh:
    for line in fh:
        if line.startswith("Title"):
            filename = re.findall("\((.*?)\)", line)[0].strip()
            if (filename):
                print(f"filename: {filename}")
                info_dict["filename"] = filename
            else:
                print("filename: None")
            documents = re.findall(r": (.*?)[,(.\n]", line)
            if documents:
                document = documents[0]
                document = document.split(" in:")[0]
                document = document.split("http")[0].strip()
                print(f"title: {document}")
                info_dict["title"] = document
            else:
                print("title: None")
            
            try:
                file = re.findall(r"in:(.*?)https", line)[0].strip()
                print(f"file: {file}")
                info_dict["file"] = file
            except:
                print("file: None")

            try: 
                link = re.findall(r"https.*", line)[0].strip()
                print(f"link: {link}")
                info_dict["link"] = link
            except IndexError:
                print("link: None")

        if (line.startswith("Official")):
            id = re.findall(":(.*)", line)[0].strip()
            if id:
                print(f"government_id: {id}")
                info_dict["government_id"] = id
            else:
                print("id: None")
                raise NameError("no id")
        
        if (line.startswith("Time Released")):
            time = re.findall(":(.*)", line)[0].strip()
            if time:
                print(f"realse time: {time}")
                info_dict["release_time"] = time
            else:
                print("release time: None")
                raise NameError("no release time")
        
        if (line.startswith("Publicized")):
            publisher = re.findall(":(.*)", line)[0].strip()
            if publisher:
                print(f"publisher: {publisher}")
                info_dict["publisher"] = publisher
            else:
                raise NameError("no publisher")

        if (line.startswith("Specific")):
            category = re.findall(":(.*)", line)[0].strip()
            if category:
                print(f"category: {category}")
                info_dict["category"] = category
            else:
                raise NameError("no category")

        if (line.startswith("Year")):
            category = re.findall(":(.*)", line)[0].strip()
            if category:
                print(f"issued time: {category}")
                info_dict["issue_time"] = category
            else:
                raise NameError("no issued time") 
        
        if (line.startswith("Summary")):
            category = re.findall(":(.*)", line)[0].strip()
            if category:
                print(f"summary: {category}")
                info_dict["summary"] = category
            else:
                raise NameError("no summary")

        if (line == '\n' and info_dict["government_id"]):
            write_info(info_dict)
            # zero out the values of info_dict
            for key in info_dict.keys():
                info_dict[key] = ""

