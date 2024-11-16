import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Blog, CreateBlogInput, UpdateBlogInput } from './blogs.dto';

@Injectable()
export class BlogsService {

    private _collectionName = 'blogs';

    constructor(private _firebaseService: FirebaseService) { }

    // Example method to interact with Firestore
    async addData(collection: string, data: any): Promise<any> {
        const db = this._firebaseService.firestore;
        const docRef = db.collection(collection).doc();
        await docRef.set(data);
        return docRef.id;
    }

    // Example method to retrieve data
    async getData() {
        const blogsCollection = this._firebaseService.firestore.collection(this._collectionName);
        const snapshot = await blogsCollection.get();

        if (snapshot.empty) {
            return []; // Return an empty array if no documents are found
        }

        // Map through the documents to create an array of BlogBlog DTOs
        const blogs: Blog[] = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id, // Firestore document ID
                ...doc.data(),
                createdAt: data.createdAt ? data.createdAt.toDate() : new Date(), // Convert to Date
            } as Blog;
        });

        return blogs;
    }

    async getBlogById(id: string): Promise<Blog> {
        const blogRef = this._firebaseService.firestore.collection(this._collectionName).doc(id);
        const blogSnapshot = await blogRef.get();

        if (!blogSnapshot.exists) {
            throw new NotFoundException(`Blog blog with ID ${id} not found.`);
        }

        const data = blogSnapshot.data();
        const createdAt = data.createdAt ? data.createdAt.toDate() : new Date(); // Fallback to current date

        return {
            id: blogSnapshot.id,
            title: data.title,
            content: data.content,
            createdAt: createdAt, // Ensure it's a valid Date object
        } as Blog;
    }

    async createBlog(createBlogInput: CreateBlogInput) {
        const blogRef = await this._firebaseService.firestore.collection(this._collectionName).doc(); // Creates a new document reference with an auto-generated ID

        const newBlog = {
            id: blogRef.id,
            ...createBlogInput,
            createdAt: new Date(),
        }

        // Set the blog data to Firestore
        await blogRef.set(newBlog);

        // Return the newly created blog data
        return newBlog;
    }

    async updateBlog(id: string, input: UpdateBlogInput): Promise<Blog> {
        const blogRef = this._firebaseService.firestore.collection(this._collectionName).doc(id);
        const blogSnapshot = await blogRef.get();

        if (!blogSnapshot.exists) {
            throw new NotFoundException(`Blog blog with ID ${id} not found.`);
        }

        // Update only the fields provided in the input
        const updatedData = {
            ...(input.title && { title: input.title }),
            ...(input.content && { content: input.content }),
            ...(input.isPublish && { content: input.isPublish }),
        };

        await blogRef.update(updatedData);

        // Return the updated blog
        const updatedBlogSnapshot = await blogRef.get();
        return {
            id: updatedBlogSnapshot.id,
            ...updatedBlogSnapshot.data(),
            updatedAt: new Date(),
        } as Blog;
    }

    async deleteBlog(id: string): Promise<void> {
        const blogRef = this._firebaseService.firestore.collection(this._collectionName).doc(id);
        const blogSnapshot = await blogRef.get();

        if (!blogSnapshot.exists) {
            throw new NotFoundException(`Blog blog with ID ${id} not found.`);
        }

        await blogRef.delete(); // Delete the document from Firestore
    }
}
