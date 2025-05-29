
import React, { useState, useEffect } from 'react';
import { X, Save, Camera, FileImage } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  status: string;
  beds?: number;
  baths?: number;
  sqft: number;
  image: string;
  dateAdded: string;
  featured: boolean;
  description: string;
  tags: string[];
  isRental: boolean;
  planImage?: string;
}

interface PropertyFormProps {
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  showPropertyForm: boolean;
  setShowPropertyForm: (show: boolean) => void;
  editingProperty: Property | null;
  setEditingProperty: (property: Property | null) => void;
}

export const PropertyForm = ({ 
  properties,
  setProperties,
  showPropertyForm,
  setShowPropertyForm,
  editingProperty,
  setEditingProperty
}: PropertyFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'Appartement',
    status: 'À Vendre',
    beds: '',
    baths: '',
    sqft: '',
    description: '',
    featured: false,
    image: '',
    planImage: '',
    tags: [],
    isRental: false
  });

  const propertyTypes = ['Appartement', 'Villa', 'Maison', 'Commerce', 'Terrain', 'Bureau'];
  const statusOptions = ['À Vendre', 'À Louer', 'Vendu', 'Loué'];
  const tagOptions = ['À Vendre', 'À Louer', 'En Vedette', 'Tendance', 'Premium'];

  useEffect(() => {
    if (editingProperty) {
      setFormData({
        ...editingProperty,
        beds: editingProperty.beds?.toString() || '',
        baths: editingProperty.baths?.toString() || '',
        sqft: editingProperty.sqft.toString(),
        price: editingProperty.price.toString(),
        planImage: editingProperty.planImage || ''
      });
    }
  }, [editingProperty]);

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      price: '',
      type: 'Appartement',
      status: 'À Vendre',
      beds: '',
      baths: '',
      sqft: '',
      description: '',
      featured: false,
      image: '',
      planImage: '',
      tags: [],
      isRental: false
    });
    setEditingProperty(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (name === 'tags') {
      const newTags = checked
        ? [...formData.tags, value]
        : formData.tags.filter(tag => tag !== value);
      setFormData(prev => ({ ...prev, tags: newTags }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          [field]: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form:', formData);
    
    const newProperty: Property = {
      ...formData,
      id: editingProperty ? editingProperty.id : Date.now(),
      dateAdded: editingProperty ? editingProperty.dateAdded : new Date().toISOString().split('T')[0],
      isRental: formData.status === 'À Louer',
      beds: formData.beds ? parseInt(formData.beds) : undefined,
      baths: formData.baths ? parseInt(formData.baths) : undefined,
      sqft: parseInt(formData.sqft),
      price: formData.price.toString(),
      tags: formData.tags as string[]
    };

    if (editingProperty) {
      setProperties(prev => prev.map(prop => 
        prop.id === editingProperty.id ? newProperty : prop
      ));
    } else {
      setProperties(prev => [...prev, newProperty]);
    }
    
    setShowPropertyForm(false);
    resetForm();
  };

  const handleClose = () => {
    setShowPropertyForm(false);
    resetForm();
  };

  if (!showPropertyForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingProperty ? 'Modifier la Propriété' : 'Ajouter une Nouvelle Propriété'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la Propriété *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="Ex: Villa moderne avec piscine"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localisation *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="Ex: Sousse, Tunisie"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix (€) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="Ex: 150000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de Propriété *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surface (m²) *
              </label>
              <input
                type="number"
                name="sqft"
                value={formData.sqft}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="Ex: 120"
              />
            </div>
            
            {(formData.type === 'Appartement' || formData.type === 'Villa' || formData.type === 'Maison') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de Chambres
                  </label>
                  <input
                    type="number"
                    name="beds"
                    value={formData.beds}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ex: 3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de Salles de Bain
                  </label>
                  <input
                    type="number"
                    name="baths"
                    value={formData.baths}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ex: 2"
                  />
                </div>
              </>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              placeholder="Description détaillée de la propriété..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {tagOptions.map(tag => (
                <div key={tag} className="flex items-center">
                  <input
                    type="checkbox"
                    name="tags"
                    value={tag}
                    checked={formData.tags.includes(tag)}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">{tag}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Principale *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {formData.image ? (
                  <div className="space-y-2">
                    <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="text-red-600 text-sm hover:text-red-700"
                    >
                      Supprimer l'image
                    </button>
                  </div>
                ) : (
                  <div>
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Cliquez pour télécharger une image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'image')}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition-colors"
                    >
                      Choisir Image
                    </label>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plan (Optionnel)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {formData.planImage ? (
                  <div className="space-y-2">
                    <img src={formData.planImage} alt="Plan Preview" className="w-full h-32 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, planImage: '' }))}
                      className="text-red-600 text-sm hover:text-red-700"
                    >
                      Supprimer le plan
                    </button>
                  </div>
                ) : (
                  <div>
                    <FileImage className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Plan architectural</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'planImage')}
                      className="hidden"
                      id="plan-upload"
                    />
                    <label
                      htmlFor="plan-upload"
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                    >
                      Choisir Plan
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
              Mettre en vedette cette propriété
            </label>
          </div>
          
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <Save className="h-5 w-5 mr-2" />
              {editingProperty ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
