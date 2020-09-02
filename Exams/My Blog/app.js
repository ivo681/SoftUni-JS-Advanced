function solve(){
   let createBtn = document.querySelector('button');
   let authorField = document.getElementById('creator');
   let titleField = document.getElementById('title')
   let categoryField = document.getElementById('category');
   let contentField = document.getElementById('content');
   let articlesSection = document.querySelectorAll('section').item(1);
   let archiveSectionUl = document.querySelector('.archive-section').children.item(1);

   createBtn.addEventListener('click', createBlog);

   function createBlog(e){
      e.preventDefault();
      let author = authorField.value;
      let title = titleField.value;
      let category = categoryField.value;
      let content = contentField.value;
      if(author.trim() === '' || title.trim() === '' || category.trim() === '' || content.trim() === ''){
         return;
      }
      let newBlogArticle = document.createElement('article');
      let blogH1 = document.createElement('h1');
      blogH1.textContent = title;
      newBlogArticle.appendChild(blogH1);
      let categoryP = document.createElement('p');
      categoryP.textContent = 'Category:';
      let categoryStrong = document.createElement('strong');
      categoryStrong.textContent = category;
      categoryP.appendChild(categoryStrong);
      newBlogArticle.appendChild(categoryP);
      let creatorP = document.createElement('p');
      creatorP.textContent = 'Creator:';
      let creatorStrong = document.createElement('strong');
      creatorStrong.textContent = author;
      creatorP.appendChild(creatorStrong);
      newBlogArticle.appendChild(creatorP);
      let contentP = document.createElement('p');
      contentP.textContent = content;
      newBlogArticle.appendChild(contentP);
      let buttonsDiv = document.createElement('div');
      buttonsDiv.classList.add('buttons');
      let deleteBtn = document.createElement('button');
      deleteBtn.classList.add('btn', 'delete')
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', deleteArticleFunc);
      buttonsDiv.appendChild(deleteBtn);
      let archiveBtn = document.createElement('button');
      archiveBtn.classList.add('btn', 'archive');
      archiveBtn.textContent = 'Archive';
      archiveBtn.addEventListener('click', archiveArticleFunc);
      buttonsDiv.appendChild(archiveBtn);
      newBlogArticle.appendChild(buttonsDiv);
      articlesSection.appendChild(newBlogArticle);
   }

   function deleteArticleFunc(e){
      e.target.parentNode.parentNode.remove();
   }

   function archiveArticleFunc(e){
      let currentArticle = e.target.parentNode.parentNode;
      currentArticle.remove();
      let title = currentArticle.children.item(0).textContent;
      let newArchiveLi = document.createElement('li');
      newArchiveLi.textContent = title;
      archiveSectionUl.appendChild(newArchiveLi);
      let items = Array.from(archiveSectionUl.children);
      archiveSectionUl.innerHTML = '';
      items.sort((a,b) => a.textContent.localeCompare(b.textContent)).forEach(li => archiveSectionUl.appendChild(li))
   }
}
