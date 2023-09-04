import { TestBed } from '@angular/core/testing';

import { ForumService } from './forum.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Post } from 'src/app/interfaces/Post';
import { Comment } from 'src/app/interfaces/Comment';
import { ENDPOINT } from 'src/app/environments/endpoints';

fdescribe('ForumService', () => {
  let forumService: ForumService;
  let httpTestingController: HttpTestingController;

  const posts: Post[] = [
    {
      title: 'Sample post 1',
      description: 'Sample description 1',
      _id: '1',
      _ownerId: '1',
      createdAt: '2023-08-12T15:34:02.954+00:00'
    },
    {
      title: 'Sample post 1',
      description: 'Sample description 1',
      _id: '1',
      _ownerId: '1',
      createdAt: '2023-08-12T15:34:02.954+00:00'
    },
    {
      title: 'Sample post 1',
      description: 'Sample description 1',
      _id: '1',
      _ownerId: '1',
      createdAt: '2023-08-12T15:34:02.954+00:00'
    },
  ]

  const allComments: Comment[] = [
    {
      userId: '1',
      createdAt: '2023-08-12T15:34:02.954+00:00',
      _id: '1',
      comment: 'test 1'
    },
    {
      userId: '2',
      createdAt: '2023-08-12T15:34:02.954+00:00',
      _id: '2',
      comment: 'test 2'
    },
    {
      userId: '3',
      createdAt: '2023-08-12T15:34:02.954+00:00',
      _id: '3',
      comment: 'test 3'
    },
  ];

  const newPost: Post = 
    {
      title: 'Sample post 4',
      description: 'Sample description 4',
      _id: '4',
      _ownerId: '4',
      createdAt: '2023-08-12T15:34:02.954+00:00'
  };

  const newComment: Comment = {
    userId: '3',
    createdAt: '2023-08-12T15:34:02.954+00:00',
    _id: '3',
    comment: 'test 3'
  }
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    forumService = TestBed.inject(ForumService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(forumService).toBeTruthy();
  });

  it('should return all posts', () => {

    forumService.getAllPosts().subscribe(returnedPosts => {
        expect(returnedPosts).toBeTruthy();
        expect(returnedPosts.length).toEqual(posts.length);
        expect(returnedPosts[1].title).toEqual(posts[1].title);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.forum}/all`);
    expect(req.request.method).toEqual('GET');
    req.flush(posts);
  });

  it('should return post by id', () => {

    forumService.getForumPost('2').subscribe(foundPost => {
        expect(foundPost).toBeTruthy();
        expect(foundPost.title).toEqual(posts[2].title);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.forum}/post/2`);
    expect(req.request.method).toEqual('GET');
    req.flush(posts[2]);
  });

  it('should return all comments', () => {

    forumService.getAllComments('223').subscribe(returnedComments => {
        expect(returnedComments).toBeTruthy();
        expect(returnedComments.length).toEqual(allComments.length);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.forum}/post/223/comment`);
    expect(req.request.method).toEqual('GET');
    req.flush(allComments);
  });

  it('returns the last 3 posts', () => {
    forumService.getLastThreePosts().subscribe(lastThreePosts => {
      expect(lastThreePosts).toBeTruthy();
      expect(lastThreePosts.length).toEqual(3);
      expect(lastThreePosts[2].title).toEqual(posts[2].title);
  });

  const req = httpTestingController.expectOne(`${ENDPOINT.forum}`);
  
  expect(req.request.method).toEqual('GET');
  
  req.flush(posts);

  });

  it('adds a new post', () => {
    forumService.addPost(newPost).subscribe(addedPost => {
      expect(addedPost).toBeTruthy();
      expect(addedPost).toEqual(newPost);
  });

  const req = httpTestingController.expectOne(`${ENDPOINT.forum}/add`);
  
  expect(req.request.method).toEqual('POST');
  expect(req.request.body).toEqual(newPost);
  
  req.flush(newPost);
  });

  it('adds a new comment', () => {
    forumService.addComment(newComment, '1').subscribe(addedComment => {
      expect(addedComment).toBeTruthy();
      expect(addedComment).toEqual(newComment);
  });

  const req = httpTestingController.expectOne(`${ENDPOINT.forum}/post/1/comment`);
  
  expect(req.request.method).toEqual('POST');
  expect(req.request.body).toEqual(newComment);
  
  req.flush(newComment);
  });

  // verify after each unit test if we did not do any real http request
  afterEach(() => {
    httpTestingController.verify();
  })

});
