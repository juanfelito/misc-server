package controllers

import (
	"encoding/json"
	"io/ioutil"
	"misc_go_server/mediators"
	"net/http"
	"net/url"
	"sync"
)

type requestBody struct {
	Key   string
	Value string
}

type Cache struct {
	CacheMediatorFactory func(*map[string][]byte) mediators.CacheMediator
	store                map[string][]byte
}

func (c *Cache) HandleCache(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		c.SetKey(w, r)
	case http.MethodGet:
		c.GetKey(w, r)
	}
}

func (c *Cache) SetKey(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		w.Write([]byte("Unable to process request body"))
		return
	}

	req := requestBody{}

	marshalErr := json.Unmarshal(body, &req)
	if marshalErr != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Unable to process request body"))
		return
	}

	if req.Key == "" || req.Value == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Either the key, body or both are empty"))
		return
	}

	mediator := c.CacheMediatorFactory(&c.store)

	mediator.SetKey(req.Key, []byte(req.Value))
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Key set successfully"))
}

func (c *Cache) GetKey(w http.ResponseWriter, r *http.Request) {
	query, err := url.ParseQuery(r.URL.RawQuery)
	if err != nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		w.Write([]byte("Unable to process query string"))
		return
	}

	key, ok := query["key"]
	if !ok || key[0] == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Key is empty"))
		return
	}

	mediator := c.CacheMediatorFactory(&c.store)

	value, found := mediator.GetKey(key[0])
	if !found {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Key not found"))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(value)
}

func NewCache() *Cache {
	mutex := sync.RWMutex{}

	return &Cache{
		store: make(map[string][]byte),
		CacheMediatorFactory: func(store *map[string][]byte) mediators.CacheMediator {
			return mediators.NewCacheMediator(store, &mutex)
		},
	}
}
